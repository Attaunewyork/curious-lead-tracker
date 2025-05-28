
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIReportGenerator } from '@/components/AIReportGenerator';
import { useLeads } from '@/hooks/useLeads';

export default function Reports() {
  const { leads, getTotalValue, getStatusStats } = useLeads();
  const totalValue = getTotalValue();
  const statusStats = getStatusStats();
  const conversionRate = leads.length > 0 ? Math.round(statusStats['closed-won'] / leads.length * 100) : 0;

  return (
    <div className="space-y-6 bg-background min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-brand-gradient">Relatórios</h1>
        <p className="text-muted-foreground">Análises detalhadas do seu pipeline de vendas</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="ai-reports">Relatórios com IA</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Performance de Vendas</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-gradient">R$ 125.430</div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação ao mês anterior
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm text-foreground">
                    <span>Meta mensal</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#FF8360] to-[#FF3C7E] h-2 rounded-full" 
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Taxa de Conversão</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-gradient">{conversionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% em relação ao mês anterior
                </p>
                <div className="mt-4 text-sm text-foreground">
                  <div className="flex justify-between">
                    <span>Leads → Propostas</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Propostas → Fechamento</span>
                    <span>54%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Novos Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-gradient">{leads.length}</div>
                <p className="text-xs text-muted-foreground">
                  +8% em relação ao mês anterior
                </p>
                <div className="mt-4 space-y-1 text-sm text-foreground">
                  <div className="flex justify-between">
                    <span>Website</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LinkedIn</span>
                    <span>28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Indicação</span>
                    <span>27%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Ticket Médio</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-gradient">R$ 18.500</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% em relação ao mês anterior
                </p>
                <div className="mt-4 text-sm text-foreground">
                  <div className="flex justify-between">
                    <span>Menor valor</span>
                    <span>R$ 5.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maior valor</span>
                    <span>R$ 85.000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-brand-gradient">Pipeline por Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Gráfico de evolução do pipeline em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-reports">
          <AIReportGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
