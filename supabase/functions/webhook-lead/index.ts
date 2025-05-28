
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

    // Only process POST requests to create leads
    if (method === 'POST') {
      // Validate required fields
      if (!body || !body.name || !body.email) {
        responseStatus = 400
        responseBody = { 
          error: 'Campos obrigatórios: name, email',
          success: false 
        }
      } else {
        // Create lead in database
        const leadData = {
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          company: body.company || null,
          status: body.status || 'new',
          source: body.source || 'Webhook',
          value: body.value || 0,
          notes: body.notes || null
        }

        const { data, error } = await supabaseClient
          .from('leads')
          .insert(leadData)
          .select()

        if (error) {
          console.error('Error inserting lead:', error)
          responseStatus = 500
          responseBody = { 
            error: 'Erro ao criar lead',
            details: error.message,
            success: false 
          }
        } else {
          responseBody = { 
            message: 'Lead criado com sucesso',
            lead: data[0],
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
