
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Search, MapPin } from 'lucide-react';

export default function PublicProperties() {
  const { properties, loading } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Filtrar apenas imóveis disponíveis para o público
  const availableProperties = properties.filter(property => property.available);

  // Aplicar filtros
  const filteredProperties = availableProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || property.property_type === filterType;
    const matchesCity = filterCity === 'all' || property.city === filterCity;
    
    let matchesPrice = true;
    if (priceRange !== 'all' && property.price) {
      switch (priceRange) {
        case 'under-100k':
          matchesPrice = property.price < 100000;
          break;
        case '100k-300k':
          matchesPrice = property.price >= 100000 && property.price < 300000;
          break;
        case '300k-500k':
          matchesPrice = property.price >= 300000 && property.price < 500000;
          break;
        case 'over-500k':
          matchesPrice = property.price >= 500000;
          break;
      }
    }

    return matchesSearch && matchesType && matchesCity && matchesPrice;
  });

  // Obter cidades únicas para o filtro
  const uniqueCities = [...new Set(availableProperties.map(p => p.city))].sort();

  const handleViewProperty = (property: any) => {
    // Aqui você pode implementar uma modal ou página de detalhes
    console.log('Visualizar imóvel:', property);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8360]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF8360] to-[#E85A4F] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Imóveis Disponíveis</h1>
            <p className="text-xl opacity-90">Encontre o imóvel perfeito para você</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger>
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as cidades</SelectItem>
                {uniqueCities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Faixa de preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as faixas</SelectItem>
                <SelectItem value="under-100k">Até R$ 100.000</SelectItem>
                <SelectItem value="100k-300k">R$ 100.000 - R$ 300.000</SelectItem>
                <SelectItem value="300k-500k">R$ 300.000 - R$ 500.000</SelectItem>
                <SelectItem value="over-500k">Acima de R$ 500.000</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterCity('all');
                setPriceRange('all');
              }}
              variant="outline"
              className="w-full"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>
              {filteredProperties.length} imóve{filteredProperties.length !== 1 ? 'is' : 'l'} encontrado{filteredProperties.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Lista de imóveis */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Nenhum imóvel encontrado</p>
              <p>Tente ajustar os filtros de busca</p>
            </div>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterCity('all');
                setPriceRange('all');
              }}
              variant="outline"
            >
              Ver todos os imóveis
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onView={handleViewProperty}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/7cf36992-8d96-4c07-8be8-7062cfc8eaca.png" 
                alt="ImovAI Logo" 
                className="w-8 h-8 rounded-full" 
              />
              <h3 className="text-xl font-semibold">ImovAI</h3>
            </div>
            <p className="text-gray-400">
              Encontre o imóvel dos seus sonhos
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
