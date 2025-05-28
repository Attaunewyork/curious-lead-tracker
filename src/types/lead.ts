
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: LeadStatus;
  source: string | null;
  value: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';

export const leadStatusColors = {
  'new': 'bg-blue-100 text-blue-800',
  'contacted': 'bg-yellow-100 text-yellow-800',
  'qualified': 'bg-purple-100 text-purple-800',
  'proposal': 'bg-orange-100 text-orange-800',
  'negotiation': 'bg-indigo-100 text-indigo-800',
  'closed-won': 'bg-green-100 text-green-800',
  'closed-lost': 'bg-red-100 text-red-800',
};

export const leadStatusLabels = {
  'new': 'Novo',
  'contacted': 'Contatado',
  'qualified': 'Qualificado',
  'proposal': 'Proposta',
  'negotiation': 'Negociação',
  'closed-won': 'Fechado - Ganho',
  'closed-lost': 'Fechado - Perdido',
};
