
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-brand-gradient">Relatórios</h1>
        <p className="text-muted-foreground">Análises detalhadas do seu pipeline de vendas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance de Vendas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-gradient">R$ 125.430</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-gradient">24.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% em relação ao mês anterior
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-gradient">142</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao mês anterior
            </p>
            <div className="mt-4 space-y-1 text-sm">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-gradient">R$ 18.500</div>
            <p className="text-xs text-muted-foreground">
              +5.2% em relação ao mês anterior
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
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

      <Card>
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
    </div>
  );
}
