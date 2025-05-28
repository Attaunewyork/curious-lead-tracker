
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropertyForm } from '@/components/PropertyForm';
import { useProperties, Property } from '@/hooks/useProperties';

export default function NewProperty() {
  const navigate = useNavigate();
  const { createProperty } = useProperties();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const success = await createProperty(data);
      if (success) {
        navigate('/properties');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/properties');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Cadastrar Novo Imóvel</h1>
        <p className="text-muted-foreground">Adicione um novo imóvel ao seu portfólio</p>
      </div>

      <PropertyForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}
