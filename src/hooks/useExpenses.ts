
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  expense_date: string;
  property?: string;
  vendor?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchExpenses = async () => {
    try {
      console.log('Fetching expenses from Supabase...');
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as despesas.",
          variant: "destructive"
        });
        return;
      }

      console.log('Fetched expenses:', data);
      setExpenses(data || []);
    } catch (error) {
      console.error('Error in fetchExpenses:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar despesas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expenseData: Omit<Expense, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([expenseData])
        .select()
        .single();

      if (error) {
        console.error('Error creating expense:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar a despesa.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Sucesso",
        description: "Despesa criada com sucesso!"
      });

      await fetchExpenses();
      return data;
    } catch (error) {
      console.error('Error in createExpense:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar despesa.",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loading,
    createExpense,
    refetch: fetchExpenses
  };
}
