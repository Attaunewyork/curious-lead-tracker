
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  property_address: string;
  requested_by: string;
  phone: string;
  email?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTickets = async () => {
    try {
      console.log('Fetching tickets from Supabase...');
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tickets:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os chamados.",
          variant: "destructive"
        });
        return;
      }

      console.log('Fetched tickets:', data);
      setTickets(data || []);
    } catch (error) {
      console.error('Error in fetchTickets:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar chamados.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticketData: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert([ticketData])
        .select()
        .single();

      if (error) {
        console.error('Error creating ticket:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar o chamado.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Sucesso",
        description: "Chamado criado com sucesso!"
      });

      await fetchTickets();
      return data;
    } catch (error) {
      console.error('Error in createTicket:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar chamado.",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    tickets,
    loading,
    createTicket,
    refetch: fetchTickets
  };
}
