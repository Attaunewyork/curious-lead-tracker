
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Employee {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  email: string;
  address: string;
  position: string;
  salary: number;
  start_date: string;
  created_at: string;
  updated_at: string;
}

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEmployees = async () => {
    try {
      console.log('Fetching employees from Supabase...');
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching employees:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os funcionários.",
          variant: "destructive"
        });
        return;
      }

      console.log('Fetched employees:', data);
      setEmployees(data || []);
    } catch (error) {
      console.error('Error in fetchEmployees:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar funcionários.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([employeeData])
        .select()
        .single();

      if (error) {
        console.error('Error creating employee:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar o funcionário.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Sucesso",
        description: "Funcionário criado com sucesso!"
      });

      await fetchEmployees();
      return data;
    } catch (error) {
      console.error('Error in createEmployee:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar funcionário.",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    createEmployee,
    refetch: fetchEmployees
  };
}
