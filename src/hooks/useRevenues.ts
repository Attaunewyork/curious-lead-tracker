
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Revenue {
  id: string;
  description: string;
  amount: number;
  category: string;
  revenue_date: string;
  property?: string;
  source?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function useRevenues() {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRevenues = async () => {
    try {
      console.log('Fetching revenues from Supabase...');
      const { data, error } = await supabase
        .from('revenues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching revenues:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as receitas.",
          variant: "destructive"
        });
        return;
      }

      console.log('Fetched revenues:', data);
      setRevenues(data || []);
    } catch (error) {
      console.error('Error in fetchRevenues:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar receitas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createRevenue = async (revenueData: Omit<Revenue, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('revenues')
        .insert([revenueData])
        .select()
        .single();

      if (error) {
        console.error('Error creating revenue:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar a receita.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Sucesso",
        description: "Receita criada com sucesso!"
      });

      await fetchRevenues();
      return data;
    } catch (error) {
      console.error('Error in createRevenue:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar receita.",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchRevenues();
  }, []);

  return {
    revenues,
    loading,
    createRevenue,
    refetch: fetchRevenues
  };
}
