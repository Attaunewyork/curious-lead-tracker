
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Property } from '@/hooks/useProperties';

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function PropertyForm({ property, onSubmit, onCancel, loading }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    property_type: property?.property_type || 'casa',
    price: property?.price?.toString() || '',
    address: property?.address || '',
    city: property?.city || '',
    state: property?.state || '',
    zipcode: property?.zipcode || '',
    bedrooms: property?.bedrooms?.toString() || '',
    bathrooms: property?.bathrooms?.toString() || '',
    area_m2: property?.area_m2?.toString() || '',
    parking_spaces: property?.parking_spaces?.toString() || '0',
    furnished: property?.furnished || false,
    available: property?.available !== false,
    images: property?.images?.join(', ') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      title: formData.title,
      description: formData.description || undefined,
      property_type: formData.property_type,
      price: formData.price ? parseFloat(formData.price) : undefined,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipcode: formData.zipcode || undefined,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
      area_m2: formData.area_m2 ? parseFloat(formData.area_m2) : undefined,
      parking_spaces: parseInt(formData.parking_spaces) || 0,
      furnished: formData.furnished,
      available: formData.available,
      images: formData.images ? formData.images.split(',').map(url => url.trim()).filter(url => url) : undefined
    };

    onSubmit(data);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {property ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Casa 3 quartos no centro"
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva as características do imóvel..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="property_type">Tipo de Imóvel *</Label>
              <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="chacara">Chácara</SelectItem>
                  <SelectItem value="sobrado">Sobrado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0,00"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Endereço *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Rua, número, bairro"
                required
              />
            </div>

            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Nome da cidade"
                required
              />
            </div>

            <div>
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="Ex: SP, RJ, MG"
                required
              />
            </div>

            <div>
              <Label htmlFor="zipcode">CEP</Label>
              <Input
                id="zipcode"
                value={formData.zipcode}
                onChange={(e) => handleInputChange('zipcode', e.target.value)}
                placeholder="00000-000"
              />
            </div>

            <div>
              <Label htmlFor="area_m2">Área (m²)</Label>
              <Input
                id="area_m2"
                type="number"
                step="0.01"
                value={formData.area_m2}
                onChange={(e) => handleInputChange('area_m2', e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="bedrooms">Quartos</Label>
              <Input
                id="bedrooms"
                type="number"
                min="0"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="bathrooms">Banheiros</Label>
              <Input
                id="bathrooms"
                type="number"
                min="0"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="parking_spaces">Vagas de Garagem</Label>
              <Input
                id="parking_spaces"
                type="number"
                min="0"
                value={formData.parking_spaces}
                onChange={(e) => handleInputChange('parking_spaces', e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="images">URLs das Imagens (separadas por vírgula)</Label>
              <Input
                id="images"
                value={formData.images}
                onChange={(e) => handleInputChange('images', e.target.value)}
                placeholder="https://exemplo.com/imagem1.jpg, https://exemplo.com/imagem2.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="furnished"
                checked={formData.furnished}
                onCheckedChange={(checked) => handleInputChange('furnished', checked as boolean)}
              />
              <Label htmlFor="furnished">Mobiliado</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="available"
                checked={formData.available}
                onCheckedChange={(checked) => handleInputChange('available', checked as boolean)}
              />
              <Label htmlFor="available">Disponível</Label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : (property ? 'Atualizar' : 'Cadastrar')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
