
import { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '@/types/lead';

// Dados de exemplo para demonstração
const sampleLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '(11) 99999-9999',
    company: 'Tech Solutions',
    status: 'new',
    source: 'Website',
    value: 15000,
    notes: 'Interessado em nossos serviços de consultoria',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@startup.com',
    phone: '(11) 88888-8888',
    company: 'Startup Inovadora',
    status: 'qualified',
    source: 'LinkedIn',
    value: 25000,
    notes: 'Precisa de implementação completa',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@industria.com',
    phone: '(11) 77777-7777',
    company: 'Indústria ABC',
    status: 'proposal',
    source: 'Indicação',
    value: 50000,
    notes: 'Projeto grande, multiple fases',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-25'
  }
];

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      const savedLeads = localStorage.getItem('crm-leads');
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      } else {
        setLeads(sampleLeads);
        localStorage.setItem('crm-leads', JSON.stringify(sampleLeads));
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedLeads = [...leads, newLead];
    setLeads(updatedLeads);
    localStorage.setItem('crm-leads', JSON.stringify(updatedLeads));
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    const updatedLeads = leads.map(lead => 
      lead.id === id 
        ? { ...lead, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
        : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('crm-leads', JSON.stringify(updatedLeads));
  };

  const deleteLead = (id: string) => {
    const updatedLeads = leads.filter(lead => lead.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem('crm-leads', JSON.stringify(updatedLeads));
  };

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter(lead => lead.status === status);
  };

  const getTotalValue = () => {
    return leads.reduce((total, lead) => total + lead.value, 0);
  };

  const getStatusStats = () => {
    const stats: Record<LeadStatus, number> = {
      'new': 0,
      'contacted': 0,
      'qualified': 0,
      'proposal': 0,
      'negotiation': 0,
      'closed-won': 0,
      'closed-lost': 0
    };

    leads.forEach(lead => {
      stats[lead.status]++;
    });

    return stats;
  };

  return {
    leads,
    loading,
    addLead,
    updateLead,
    deleteLead,
    getLeadsByStatus,
    getTotalValue,
    getStatusStats
  };
}
