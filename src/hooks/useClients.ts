
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Client {
  id: string;
  name: string;
  cpf_cnpj: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  observations?: string;
  created_at: string;
  updated_at: string;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchClients = async () => {
    try {
      console.log('Fetching clients from Supabase...');
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os clientes.",
          variant: "destructive"
        });
        return;
      }

      console.log('Fetched clients:', data);
      setClients(data || []);
    } catch (error) {
      console.error('Error in fetchClients:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar clientes.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([clientData])
        .select()
        .single();

      if (error) {
        console.error('Error creating client:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar o cliente.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Sucesso",
        description: "Cliente criado com sucesso!"
      });

      await fetchClients();
      return data;
    } catch (error) {
      console.error('Error in createClient:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar cliente.",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    createClient,
    refetch: fetchClients
  };
}
