
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyForm } from '@/components/PropertyForm';
import { useProperties, Property } from '@/hooks/useProperties';
import { Plus, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Properties() {
  const { properties, loading, createProperty, updateProperty, deleteProperty } = useProperties();
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterAvailable, setFilterAvailable] = useState('all');

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || property.property_type === filterType;
    const matchesAvailable = filterAvailable === 'all' || 
                           (filterAvailable === 'available' && property.available) ||
                           (filterAvailable === 'unavailable' && !property.available);

    return matchesSearch && matchesType && matchesAvailable;
  });

  const handleCreateProperty = async (data: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
    const success = await createProperty(data);
    if (success) {
      setShowForm(false);
    }
  };

  const handleUpdateProperty = async (data: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingProperty) return;
    
    const success = await updateProperty(editingProperty.id, data);
    if (success) {
      setEditingProperty(undefined);
      setShowForm(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      await deleteProperty(id);
    }
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProperty(undefined);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8360]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-brand-gradient mb-2">Seus Imóveis</h1>
          <p className="text-muted-foreground">Gerencie seu portfólio de imóveis</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-brand-gradient hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Imóvel
        </Button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar imóveis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de imóvel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="casa">Casa</SelectItem>
            <SelectItem value="apartamento">Apartamento</SelectItem>
            <SelectItem value="terreno">Terreno</SelectItem>
            <SelectItem value="comercial">Comercial</SelectItem>
            <SelectItem value="chacara">Chácara</SelectItem>
            <SelectItem value="sobrado">Sobrado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterAvailable} onValueChange={setFilterAvailable}>
          <SelectTrigger>
            <SelectValue placeholder="Disponibilidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="available">Disponíveis</SelectItem>
            <SelectItem value="unavailable">Indisponíveis</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-sm text-muted-foreground flex items-center">
          {filteredProperties.length} imóve{filteredProperties.length !== 1 ? 'is' : 'l'} encontrado{filteredProperties.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Lista de imóveis */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {properties.length === 0 ? 'Nenhum imóvel cadastrado ainda.' : 'Nenhum imóvel encontrado com os filtros aplicados.'}
          </p>
          {properties.length === 0 && (
            <Button onClick={() => setShowForm(true)} className="bg-brand-gradient hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Primeiro Imóvel
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
          ))}
        </div>
      )}

      {/* Modal do formulário */}
      <Dialog open={showForm} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProperty ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}
            </DialogTitle>
          </DialogHeader>
          <PropertyForm
            property={editingProperty}
            onSubmit={editingProperty ? handleUpdateProperty : handleCreateProperty}
            onCancel={handleCloseForm}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
