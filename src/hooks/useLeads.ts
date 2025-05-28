
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Lead, LeadStatus } from '@/types/lead';
import { useToast } from '@/hooks/use-toast';

export function useLeads() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch leads from Supabase
  const { data: leads = [], isLoading: loading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      console.log('Fetching leads from Supabase...');
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        throw error;
      }

      console.log('Fetched leads:', data);
      return data || [];
    },
  });

  // Add lead mutation
  const addLeadMutation = useMutation({
    mutationFn: async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
      console.log('Adding lead:', lead);
      const { data, error } = await supabase
        .from('leads')
        .insert({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          status: lead.status,
          source: lead.source,
          value: lead.value,
          notes: lead.notes
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding lead:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead adicionado",
        description: "O lead foi criado com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Failed to add lead:', error);
      toast({
        title: "Erro",
        description: "Falha ao criar o lead. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Update lead mutation
  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Lead> }) => {
      console.log('Updating lead:', id, updates);
      const { data, error } = await supabase
        .from('leads')
        .update({
          name: updates.name,
          email: updates.email,
          phone: updates.phone,
          company: updates.company,
          status: updates.status,
          source: updates.source,
          value: updates.value,
          notes: updates.notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating lead:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead atualizado",
        description: "O lead foi atualizado com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Failed to update lead:', error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar o lead. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Delete lead mutation
  const deleteLeadMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting lead:', id);
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting lead:', error);
        throw error;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead excluído",
        description: "O lead foi removido com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Failed to delete lead:', error);
      toast({
        title: "Erro",
        description: "Falha ao excluir o lead. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    addLeadMutation.mutate(lead);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    updateLeadMutation.mutate({ id, updates });
  };

  const deleteLead = (id: string) => {
    deleteLeadMutation.mutate(id);
  };

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter(lead => lead.status === status);
  };

  const getTotalValue = () => {
    return leads.reduce((total, lead) => total + (lead.value || 0), 0);
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
      stats[lead.status as LeadStatus]++;
    });

    return stats;
  };

  return {
    leads,
    loading,
    error,
    addLead,
    updateLead,
    deleteLead,
    getLeadsByStatus,
    getTotalValue,
    getStatusStats
  };
}
