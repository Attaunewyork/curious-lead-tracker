
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data, customData } = await req.json();

    let prompt = '';
    
    if (type === 'full-report') {
      prompt = `
        Gere um relatório completo e profissional de vendas baseado nos seguintes dados do CRM:
        
        Dados dos Leads: ${JSON.stringify(data.leads)}
        Estatísticas: ${JSON.stringify(data.stats)}
        Valor Total: ${data.totalValue}
        
        O relatório deve incluir:
        1. Resumo executivo
        2. Análise de performance de vendas
        3. Análise do pipeline
        4. Tendências e insights
        5. Recomendações estratégicas
        
        Formate em markdown com seções bem organizadas e use dados específicos dos leads fornecidos.
      `;
    } else if (type === 'proposal') {
      prompt = `
        Crie uma proposta comercial profissional baseada nas seguintes informações:
        
        ${customData.proposalInfo}
        
        A proposta deve incluir:
        1. Apresentação da empresa
        2. Entendimento da necessidade do cliente
        3. Solução proposta detalhada
        4. Investimento (se mencionado)
        5. Cronograma (se mencionado)
        6. Próximos passos
        7. Termos e condições básicos
        
        Use um tom profissional e persuasivo, formatando em markdown com seções bem estruturadas.
        Extraia todas as informações relevantes do texto fornecido e organize de forma clara e atrativa.
      `;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um especialista em vendas e relatórios comerciais. Gere conteúdo profissional, detalhado e baseado em dados reais. Use português brasileiro.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const openAIData = await response.json();
    const generatedContent = openAIData.choices[0].message.content;

    return new Response(
      JSON.stringify({ content: generatedContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-reports function:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao gerar relatório', details: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
