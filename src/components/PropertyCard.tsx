
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Car, Edit, Trash2, Eye } from 'lucide-react';
import { Property } from '@/hooks/useProperties';

interface PropertyCardProps {
  property: Property;
  onEdit?: (property: Property) => void;
  onDelete?: (id: string) => void;
  onView?: (property: Property) => void;
}

export function PropertyCard({ property, onEdit, onDelete, onView }: PropertyCardProps) {
  const formatCurrency = (value?: number) => {
    if (!value) return 'Preço sob consulta';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatArea = (area?: number) => {
    if (!area) return '';
    return `${area}m²`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      {property.images && property.images.length > 0 ? (
        <div className="h-48 overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-48 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">Sem imagem</span>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {property.title}
          </CardTitle>
          <Badge variant={property.available ? "default" : "secondary"}>
            {property.available ? "Disponível" : "Indisponível"}
          </Badge>
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="line-clamp-1">{property.address}, {property.city} - {property.state}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-2xl font-bold text-brand-gradient">
            {formatCurrency(property.price)}
          </div>

          {property.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {property.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {property.bedrooms && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.bedrooms} quarto{property.bedrooms > 1 ? 's' : ''}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.bathrooms} banheiro{property.bathrooms > 1 ? 's' : ''}</span>
              </div>
            )}
            {property.parking_spaces > 0 && (
              <div className="flex items-center">
                <Car className="w-4 h-4 mr-1" />
                <span>{property.parking_spaces} vaga{property.parking_spaces > 1 ? 's' : ''}</span>
              </div>
            )}
            {property.area_m2 && (
              <span className="font-medium">{formatArea(property.area_m2)}</span>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            {onView && (
              <Button variant="outline" size="sm" onClick={() => onView(property)} className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Ver
              </Button>
            )}
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(property)}>
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button variant="outline" size="sm" onClick={() => onDelete(property.id)} className="text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
