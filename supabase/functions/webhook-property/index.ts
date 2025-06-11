
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Get request details
    const url = new URL(req.url)
    const method = req.method
    const headers = Object.fromEntries(req.headers.entries())
    const userAgent = req.headers.get('user-agent') || ''
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''

    let body = null
    let responseStatus = 200
    let responseBody = { success: true }

    // Parse JSON body
    try {
      const text = await req.text()
      if (text) {
        body = JSON.parse(text)
      }
    } catch (e) {
      console.log('No JSON body or invalid JSON:', e)
      if (method === 'POST') {
        responseStatus = 400
        responseBody = { 
          error: 'JSON inválido no corpo da requisição',
          success: false 
        }
      }
    }

    console.log('Webhook request received:', {
      method,
      endpoint: url.pathname,
      body,
      headers: Object.keys(headers)
    })

    // Log the webhook request
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
          user_agent: userAgent
        })
        .select('id')
        .single()

      if (logError) {
        console.error('Error creating webhook log:', logError)
      } else {
        logId = logData?.id
      }
    } catch (logErr) {
      console.error('Failed to create webhook log:', logErr)
    }

    // Only process POST requests to create properties
    if (method === 'POST' && responseStatus === 200) {
      // Validate required fields
      if (!body || !body.title || !body.address || !body.city || !body.state) {
        responseStatus = 400
        responseBody = { 
          error: 'Campos obrigatórios: title, address, city, state',
          received: body,
          success: false 
        }
      } else {
        try {
          // Prepare property data with proper type conversion and defaults
          const propertyData = {
            title: String(body.title).trim(),
            description: body.description ? String(body.description).trim() : null,
            property_type: body.property_type ? String(body.property_type) : 'casa',
            price: body.price ? parseFloat(String(body.price)) : null,
            address: String(body.address).trim(),
            city: String(body.city).trim(),
            state: String(body.state).trim(),
            zipcode: body.zipcode ? String(body.zipcode).trim() : null,
            bedrooms: body.bedrooms ? parseInt(String(body.bedrooms)) : null,
            bathrooms: body.bathrooms ? parseInt(String(body.bathrooms)) : null,
            area_m2: body.area_m2 ? parseFloat(String(body.area_m2)) : null,
            parking_spaces: body.parking_spaces ? parseInt(String(body.parking_spaces)) : 0,
            furnished: body.furnished === true || body.furnished === 'true',
            available: body.available !== false && body.available !== 'false',
            images: Array.isArray(body.images) ? body.images : null
          }

          console.log('Creating property with data:', propertyData)

          // Create property in database
          const { data, error } = await supabaseClient
            .from('properties')
            .insert(propertyData)
            .select()
            .single()

          if (error) {
            console.error('Error inserting property:', error)
            responseStatus = 500
            responseBody = { 
              error: 'Erro ao criar imóvel',
              details: error.message,
              code: error.code,
              success: false 
            }
          } else {
            console.log('Property created successfully:', data)
            responseBody = { 
              message: 'Imóvel criado com sucesso',
              property: data,
              success: true 
            }
          }
        } catch (insertError) {
          console.error('Exception while creating property:', insertError)
          responseStatus = 500
          responseBody = { 
            error: 'Erro interno ao processar dados do imóvel',
            details: insertError.message,
            success: false 
          }
        }
      }
    } else if (method !== 'POST') {
      responseStatus = 405
      responseBody = { 
        error: 'Método não permitido. Use POST.',
        success: false 
      }
    }

    // Update log with response if we have a log ID
    if (logId) {
      try {
        await supabaseClient
          .from('webhook_logs')
          .update({
            response_status: responseStatus,
            response_body: responseBody
          })
          .eq('id', logId)
      } catch (updateErr) {
        console.error('Failed to update webhook log:', updateErr)
      }
    }

    console.log('Sending response:', { status: responseStatus, body: responseBody })

    return new Response(
      JSON.stringify(responseBody),
      {
        status: responseStatus,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error('Webhook error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
