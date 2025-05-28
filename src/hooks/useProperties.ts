
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Property {
  id: string;
  title: string;
  description?: string;
  property_type: string;
  price?: number;
  address: string;
  city: string;
  state: string;
  zipcode?: string;
  bedrooms?: number;
  bathrooms?: number;
  area_m2?: number;
  parking_spaces: number;
  furnished: boolean;
  available: boolean;
  images?: string[];
  created_at: string;
  updated_at: string;
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProperties = async () => {
    try {
      console.log('Fetching properties from Supabase...');
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os imóveis.",
          variant: "destructive"
        });
        return;
      }

      console.log('Fetched properties:', data);
      setProperties(data || []);
    } catch (error) {
      console.error('Error in fetchProperties:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar imóveis.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async (propertyData: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
        .single();

      if (error) {
        console.error('Error creating property:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar o imóvel.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Sucesso",
        description: "Imóvel criado com sucesso!"
      });

      await fetchProperties();
      return data;
    } catch (error) {
      console.error('Error in createProperty:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao criar imóvel.",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating property:', error);
        toast({
          title: "Erro",
          description: "Não foi possível atualizar o imóvel.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Sucesso",
        description: "Imóvel atualizado com sucesso!"
      });

      await fetchProperties();
      return true;
    } catch (error) {
      console.error('Error in updateProperty:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao atualizar imóvel.",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting property:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o imóvel.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Sucesso",
        description: "Imóvel excluído com sucesso!"
      });

      await fetchProperties();
      return true;
    } catch (error) {
      console.error('Error in deleteProperty:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao excluir imóvel.",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    createProperty,
    updateProperty,
    deleteProperty,
    refetch: fetchProperties
  };
}
