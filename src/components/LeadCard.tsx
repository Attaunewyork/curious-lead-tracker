
import { Lead, leadStatusColors, leadStatusLabels } from '@/types/lead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Building, Edit, Trash2 } from 'lucide-react';

interface LeadCardProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

export function LeadCard({ lead, onEdit, onDelete }: LeadCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{lead.name}</h3>
            <Badge className={`mt-1 ${leadStatusColors[lead.status]}`}>
              {leadStatusLabels[lead.status]}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(lead)}
              className="hover:bg-accent"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(lead.id)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="w-4 h-4" />
            <span>{lead.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{lead.phone}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Valor potencial:</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {formatCurrency(lead.value)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-muted-foreground">Origem:</span>
            <span className="text-sm font-medium text-foreground">{lead.source}</span>
          </div>
        </div>

        {lead.notes && (
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <p className="text-sm text-foreground">{lead.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
