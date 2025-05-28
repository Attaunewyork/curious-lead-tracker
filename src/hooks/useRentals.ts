
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Rental {
  id: string;
  property_address: string;
  tenant_name: string;
  tenant_cpf: string;
  tenant_phone: string;
  tenant_email: string;
  rent_value: number;
  start_date: string;
  end_date: string;
  deposit?: number;
  observations?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useRentals() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRentals = async () => {
    try {
      console.log('Fetching rentals from Supabase...');
      const { data, error } = await supabase
        .from('rentals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching rentals:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as locações.",
          variant: "destructive"
        });
        return;
      }

      console.log('Fetched rentals:', data);
      setRentals(data || []);
    } catch (error) {
      console.error('Error in fetchRentals:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar locações.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createRental = async (rentalData: Omit<Rental, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('rentals')
        .insert([rentalData])
        .select()
        .single();

      if (error) {
        console.error('Error creating rental:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar a locação.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Sucesso",
        description: "Locação criada com sucesso!"
      });

      await fetchRentals();
      return data;
    } catch (error) {
      console.error('Error in createRental:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar locação.",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  return {
    rentals,
    loading,
    createRental,
    refetch: fetchRentals
  };
}
