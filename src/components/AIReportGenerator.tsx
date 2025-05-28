
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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
  const [proposalData, setProposalData] = useState({
    clientName: '',
    clientCompany: '',
    projectDescription: '',
    solution: '',
    investment: '',
    timeline: ''
  });

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
    if (!proposalData.clientName || !proposalData.clientCompany) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha pelo menos o nome e empresa do cliente.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-reports', {
        body: {
          type: 'proposal',
          customData: proposalData
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
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-gradient flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Relatório Completo com IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Gere um relatório completo automaticamente usando todos os dados do seu CRM.
                A IA analisará seus leads, vendas e métricas para criar insights valiosos.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Dados que serão analisados:</p>
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
                className="w-full"
              >
                {loading ? 'Gerando relatório...' : 'Gerar Relatório Completo'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposal">
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-gradient flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Criador de Proposta Profissional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Nome do Cliente *</Label>
                  <Input
                    id="clientName"
                    value={proposalData.clientName}
                    onChange={(e) => setProposalData({ ...proposalData, clientName: e.target.value })}
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <Label htmlFor="clientCompany">Empresa do Cliente *</Label>
                  <Input
                    id="clientCompany"
                    value={proposalData.clientCompany}
                    onChange={(e) => setProposalData({ ...proposalData, clientCompany: e.target.value })}
                    placeholder="Tech Solutions Ltda"
                  />
                </div>
                <div>
                  <Label htmlFor="investment">Investimento</Label>
                  <Input
                    id="investment"
                    value={proposalData.investment}
                    onChange={(e) => setProposalData({ ...proposalData, investment: e.target.value })}
                    placeholder="R$ 15.000,00"
                  />
                </div>
                <div>
                  <Label htmlFor="timeline">Prazo</Label>
                  <Input
                    id="timeline"
                    value={proposalData.timeline}
                    onChange={(e) => setProposalData({ ...proposalData, timeline: e.target.value })}
                    placeholder="30 dias"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="projectDescription">Descrição do Projeto</Label>
                <Textarea
                  id="projectDescription"
                  value={proposalData.projectDescription}
                  onChange={(e) => setProposalData({ ...proposalData, projectDescription: e.target.value })}
                  placeholder="Descreva as necessidades e objetivos do cliente..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="solution">Solução Proposta</Label>
                <Textarea
                  id="solution"
                  value={proposalData.solution}
                  onChange={(e) => setProposalData({ ...proposalData, solution: e.target.value })}
                  placeholder="Descreva a solução que será oferecida..."
                  rows={3}
                />
              </div>
              <Button 
                onClick={generateProposal} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Gerando proposta...' : 'Gerar Proposta Profissional'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {generatedContent && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-brand-gradient">Conteúdo Gerado</CardTitle>
            <Button onClick={downloadContent} size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Baixar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
