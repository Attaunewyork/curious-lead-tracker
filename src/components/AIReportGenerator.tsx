
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, FileText, Download } from 'lucide-react';
import { useLeads } from '@/hooks/useLeads';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function AIReportGenerator() {
  const { leads, getTotalValue, getStatusStats } = useLeads();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [proposalInfo, setProposalInfo] = useState('');

  const generateFullReport = async () => {
    setLoading(true);
    try {
      const totalValue = getTotalValue();
      const stats = getStatusStats();
      
      const { data, error } = await supabase.functions.invoke('ai-reports', {
        body: {
          type: 'full-report',
          data: {
            leads: leads.slice(0, 10), // Primeiros 10 leads para não sobrecarregar
            stats,
            totalValue
          }
        }
      });

      if (error) throw error;
      
      setGeneratedContent(data.content);
      toast({
        title: "Relatório gerado!",
        description: "Relatório completo criado com sucesso."
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Erro",
        description: "Falha ao gerar relatório. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateProposal = async () => {
    if (!proposalInfo.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Preencha as informações para gerar a proposta.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-reports', {
        body: {
          type: 'proposal',
          customData: { proposalInfo }
        }
      });

      if (error) throw error;
      
      setGeneratedContent(data.content);
      toast({
        title: "Proposta gerada!",
        description: "Proposta comercial criada com sucesso."
      });
    } catch (error) {
      console.error('Error generating proposal:', error);
      toast({
        title: "Erro",
        description: "Falha ao gerar proposta. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'relatorio-ia.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="report" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="report" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Relatório Completo
          </TabsTrigger>
          <TabsTrigger value="proposal" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Proposta Comercial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="report">
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-brand-gradient flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Relatório Completo com IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Gere um relatório completo automaticamente usando todos os dados do seu CRM.
                A IA analisará seus leads, vendas e métricas para criar insights valiosos.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2 text-foreground">Dados que serão analisados:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {leads.length} leads cadastrados</li>
                  <li>• Valor total do pipeline: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getTotalValue())}</li>
                  <li>• Distribuição por status</li>
                  <li>• Tendências e padrões</li>
                </ul>
              </div>
              <Button 
                onClick={generateFullReport} 
                disabled={loading || leads.length === 0}
                className="w-full bg-gradient-to-r from-[#FF8360] to-[#FF3C7E] hover:from-[#e6755a] hover:to-[#e63571] text-white"
              >
                {loading ? 'Gerando relatório...' : 'Gerar Relatório Completo'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposal">
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-brand-gradient flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Criador de Proposta Profissional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Descreva as informações do cliente e do projeto para gerar uma proposta comercial profissional.
              </p>
              <div>
                <Label htmlFor="proposalInfo" className="text-foreground">Informações da Proposta</Label>
                <Textarea
                  id="proposalInfo"
                  value={proposalInfo}
                  onChange={(e) => setProposalInfo(e.target.value)}
                  placeholder="Descreva as informações relevantes para a proposta: nome do cliente, empresa, projeto, valor, prazo, etc."
                  rows={6}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <Button 
                onClick={generateProposal} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FF8360] to-[#FF3C7E] hover:from-[#e6755a] hover:to-[#e63571] text-white"
              >
                {loading ? 'Gerando proposta...' : 'Gerar Proposta Profissional'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {generatedContent && (
        <Card className="bg-background border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-brand-gradient">Conteúdo Gerado</CardTitle>
            <Button onClick={downloadContent} size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Baixar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-foreground">{generatedContent}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
