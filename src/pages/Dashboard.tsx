
import { Users, DollarSign, TrendingUp, Target } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { useLeads } from '@/hooks/useLeads';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { leadStatusLabels } from '@/types/lead';

export default function Dashboard() {
  const {
    leads,
    loading,
    getTotalValue,
    getStatusStats
  } = useLeads();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8360]"></div>
      </div>
    );
  }

  const totalValue = getTotalValue();
  const statusStats = getStatusStats();
  const conversionRate = leads.length > 0 ? Math.round(statusStats['closed-won'] / leads.length * 100) : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu pipeline de vendas</p>
      </div>

      {/* Estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Leads"
          value={leads.length}
          icon={Users}
          trend={{
            value: 12,
            isPositive: true
          }}
        />
        <StatCard
          title="Valor Total"
          value={formatCurrency(totalValue)}
          icon={DollarSign}
          trend={{
            value: 8,
            isPositive: true
          }}
        />
        <StatCard
          title="Taxa de Conversão"
          value={`${conversionRate}%`}
          icon={Target}
          trend={{
            value: 5,
            isPositive: true
          }}
        />
        <StatCard
          title="Leads Ativos"
          value={leads.length - statusStats['closed-won'] - statusStats['closed-lost']}
          icon={TrendingUp}
          trend={{
            value: 3,
            isPositive: false
          }}
        />
      </div>

      {/* Pipeline por status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle className="text-brand-gradient">Pipeline por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusStats).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {leadStatusLabels[status as keyof typeof leadStatusLabels]}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#FF8360] to-[#FF3C7E] h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${leads.length > 0 ? count / leads.length * 100 : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground min-w-[2rem]">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle className="text-brand-gradient">Leads Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                  <div>
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-brand-gradient">
                      {formatCurrency(lead.value)}
                    </p>
                    <p className="text-xs text-muted-foreground">{lead.created_at}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
