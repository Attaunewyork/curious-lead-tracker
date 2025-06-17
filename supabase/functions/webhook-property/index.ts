
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client with service role key for admin operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Webhook property called with method:', req.method)

    // Get request details for logging
    const url = new URL(req.url)
    const method = req.method
    const headers = Object.fromEntries(req.headers.entries())
    const userAgent = req.headers.get('user-agent') || ''
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''

    let body = null
    let responseStatus = 200
    let responseBody = { success: true, message: 'Webhook recebido com sucesso' }

    // Parse request body
    if (method === 'POST') {
      try {
        const text = await req.text()
        console.log('Raw request body:', text)
        
        if (text && text.trim()) {
          body = JSON.parse(text)
          console.log('Parsed body:', body)
        } else {
          console.log('Empty request body')
          responseStatus = 400
          responseBody = { 
            error: 'Corpo da requisição está vazio',
            success: false 
          }
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        responseStatus = 400
        responseBody = { 
          error: 'JSON inválido no corpo da requisição',
          details: parseError.message,
          success: false 
        }
      }
    }

    // Log the webhook request (even if it fails)
    let logId = null
    try {
      const { data: logData, error: logError } = await supabaseClient
        .from('webhook_logs')
        .insert({
          endpoint: url.pathname,
          method,
          headers,
          body,
          ip_address: clientIP,
          user_agent: userAgent,
          response_status: responseStatus
        })
        .select('id')
        .single()

      if (logError) {
        console.error('Error creating webhook log:', logError)
      } else {
        logId = logData?.id
        console.log('Webhook log created with ID:', logId)
      }
    } catch (logErr) {
      console.error('Failed to create webhook log:', logErr)
    }

    // Process POST requests to create properties
    if (method === 'POST' && responseStatus === 200 && body) {
      // Validate required fields
      const requiredFields = ['title', 'address', 'city', 'state']
      const missingFields = requiredFields.filter(field => !body[field] || !String(body[field]).trim())
      
      if (missingFields.length > 0) {
        responseStatus = 400
        responseBody = { 
          error: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
          required_fields: requiredFields,
          received_data: body,
          success: false 
        }
        console.log('Missing required fields:', missingFields)
      } else {
        try {
          // Prepare property data with proper validation and defaults
          const propertyData = {
            title: String(body.title).trim(),
            description: body.description ? String(body.description).trim() : null,
            property_type: body.property_type ? String(body.property_type).toLowerCase() : 'casa',
            price: body.price ? parseFloat(String(body.price)) : null,
            address: String(body.address).trim(),
            city: String(body.city).trim(),
            state: String(body.state).trim().toUpperCase(),
            zipcode: body.zipcode ? String(body.zipcode).trim() : null,
            bedrooms: body.bedrooms ? parseInt(String(body.bedrooms)) : null,
            bathrooms: body.bathrooms ? parseInt(String(body.bathrooms)) : null,
            area_m2: body.area_m2 ? parseFloat(String(body.area_m2)) : null,
            parking_spaces: body.parking_spaces ? parseInt(String(body.parking_spaces)) : 0,
            furnished: Boolean(body.furnished === true || body.furnished === 'true'),
            available: body.available !== false && body.available !== 'false',
            images: Array.isArray(body.images) ? body.images.filter(img => img && typeof img === 'string') : null
          }

          console.log('Creating property with data:', propertyData)

          // Insert property into database
          const { data: propertyResult, error: insertError } = await supabaseClient
            .from('properties')
            .insert(propertyData)
            .select()
            .single()

          if (insertError) {
            console.error('Database insertion error:', insertError)
            responseStatus = 500
            responseBody = { 
              error: 'Erro ao criar imóvel no banco de dados',
              details: insertError.message,
              code: insertError.code,
              hint: insertError.hint,
              success: false 
            }
          } else {
            console.log('Property created successfully:', propertyResult)
            responseStatus = 201
            responseBody = { 
              message: 'Imóvel criado com sucesso',
              property: propertyResult,
              success: true 
            }
          }
        } catch (processError) {
          console.error('Error processing property data:', processError)
          responseStatus = 500
          responseBody = { 
            error: 'Erro interno ao processar dados do imóvel',
            details: processError.message,
            success: false 
          }
        }
      }
    } else if (method !== 'POST') {
      responseStatus = 405
      responseBody = { 
        error: 'Método não permitido. Use POST para criar imóveis.',
        allowed_methods: ['POST', 'OPTIONS'],
        success: false 
      }
    }

    // Update the webhook log with the final response
    if (logId) {
      try {
        await supabaseClient
          .from('webhook_logs')
          .update({
            response_status: responseStatus,
            response_body: responseBody
          })
          .eq('id', logId)
        console.log('Webhook log updated successfully')
      } catch (updateErr) {
        console.error('Failed to update webhook log:', updateErr)
      }
    }

    console.log('Sending response:', { status: responseStatus, body: responseBody })

    return new Response(
      JSON.stringify(responseBody),
      {
        status: responseStatus,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
      },
    )

  } catch (error) {
    console.error('Unexpected webhook error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
      },
    )
  }
})
