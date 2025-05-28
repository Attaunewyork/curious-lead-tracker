
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  featuredImage?: string;
  onFeaturedImageChange?: (imageUrl: string) => void;
}

export function ImageUpload({ 
  images, 
  onImagesChange, 
  featuredImage, 
  onFeaturedImageChange 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      // Simular upload - em produção, você faria upload real para Supabase Storage
      const newImageUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Criar URL temporária para preview
        const imageUrl = URL.createObjectURL(file);
        newImageUrls.push(imageUrl);
      }
      
      const updatedImages = [...images, ...newImageUrls];
      onImagesChange(updatedImages);
      
      // Se não há imagem em destaque, definir a primeira como destaque
      if (!featuredImage && newImageUrls.length > 0 && onFeaturedImageChange) {
        onFeaturedImageChange(newImageUrls[0]);
      }
      
      toast({
        title: "Sucesso",
        description: `${newImageUrls.length} imagem(ns) adicionada(s)`
      });
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast({
        title: "Erro",
        description: "Erro ao fazer upload das imagens",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (imageUrl: string) => {
    const updatedImages = images.filter(img => img !== imageUrl);
    onImagesChange(updatedImages);
    
    // Se a imagem removida era a destaque, limpar
    if (featuredImage === imageUrl && onFeaturedImageChange) {
      onFeaturedImageChange(updatedImages[0] || '');
    }
  };

  const setAsFeatured = (imageUrl: string) => {
    if (onFeaturedImageChange) {
      onFeaturedImageChange(imageUrl);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Fazendo upload...' : 'Adicionar Imagens'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Imagem ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              
              {/* Overlay com botões */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={featuredImage === imageUrl ? "default" : "secondary"}
                  onClick={() => setAsFeatured(imageUrl)}
                  className="p-2"
                >
                  <Star className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => removeImage(imageUrl)}
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Indicador de imagem em destaque */}
              {featuredImage === imageUrl && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white p-1 rounded">
                  <Star className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
