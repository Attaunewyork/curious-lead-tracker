
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

    try {
      body = await req.json()
    } catch (e) {
      console.log('No JSON body or invalid JSON')
    }

    // Log the webhook request
    await supabaseClient
      .from('webhook_logs')
      .insert({
        endpoint: url.pathname,
        method,
        headers,
        body,
        ip_address: clientIP,
        user_agent: userAgent
      })

    // Only process POST requests to create properties
    if (method === 'POST') {
      // Validate required fields
      if (!body || !body.title || !body.address || !body.city || !body.state) {
        responseStatus = 400
        responseBody = { 
          error: 'Campos obrigatórios: title, address, city, state',
          success: false 
        }
      } else {
        // Create property in database
        const propertyData = {
          title: body.title,
          description: body.description || null,
          property_type: body.property_type || 'casa',
          price: body.price ? parseFloat(body.price) : null,
          address: body.address,
          city: body.city,
          state: body.state,
          zipcode: body.zipcode || null,
          bedrooms: body.bedrooms ? parseInt(body.bedrooms) : null,
          bathrooms: body.bathrooms ? parseInt(body.bathrooms) : null,
          area_m2: body.area_m2 ? parseFloat(body.area_m2) : null,
          parking_spaces: body.parking_spaces ? parseInt(body.parking_spaces) : 0,
          furnished: body.furnished === true || body.furnished === 'true' || false,
          available: body.available !== false && body.available !== 'false',
          images: body.images || null
        }

        const { data, error } = await supabaseClient
          .from('properties')
          .insert(propertyData)
          .select()

        if (error) {
          console.error('Error inserting property:', error)
          responseStatus = 500
          responseBody = { 
            error: 'Erro ao criar imóvel',
            details: error.message,
            success: false 
          }
        } else {
          responseBody = { 
            message: 'Imóvel criado com sucesso',
            property: data[0],
            success: true 
          }
        }
      }
    } else {
      responseStatus = 405
      responseBody = { 
        error: 'Método não permitido. Use POST.',
        success: false 
      }
    }

    // Update log with response
    await supabaseClient
      .from('webhook_logs')
      .update({
        response_status: responseStatus,
        response_body: responseBody
      })
      .eq('created_at', new Date().toISOString().split('.')[0] + 'Z')

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
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
