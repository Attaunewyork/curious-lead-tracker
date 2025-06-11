
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Webhook, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function WebhookPropertyInfo() {
  const { toast } = useToast();

  const webhookUrl = 'https://ijfkhyeljrxbkspgqewl.supabase.co/functions/v1/webhook-property';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "URL do webhook copiada para a área de transferência."
    });
  };

  const examplePayload = {
    title: "Casa 3 Quartos",
    description: "Linda casa com 3 quartos em ótima localização",
    property_type: "casa",
    price: 350000,
    address: "Rua das Palmeiras, 456",
    city: "São Paulo",
    state: "SP",
    zipcode: "01234-567",
    bedrooms: 3,
    bathrooms: 2,
    area_m2: 120,
    parking_spaces: 2,
    furnished: false,
    available: true,
    images: ["https://exemplo.com/foto1.jpg", "https://exemplo.com/foto2.jpg"]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-gradient">
            <Webhook className="w-5 h-5" />
            API Webhook - Imóveis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              URL do Webhook:
            </label>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-3 py-2 rounded text-sm flex-1 font-mono">
                {webhookUrl}
              </code>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => copyToClipboard(webhookUrl)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">POST</Badge>
            <Badge variant="outline" className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300">
              <CheckCircle className="w-3 h-3 mr-1" />
              Ativo
            </Badge>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Campos Obrigatórios:
            </label>
            <div className="flex gap-2">
              <Badge variant="destructive">title</Badge>
              <Badge variant="destructive">address</Badge>
              <Badge variant="destructive">city</Badge>
              <Badge variant="destructive">state</Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Campos Opcionais:
            </label>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">description</Badge>
              <Badge variant="secondary">property_type</Badge>
              <Badge variant="secondary">price</Badge>
              <Badge variant="secondary">zipcode</Badge>
              <Badge variant="secondary">bedrooms</Badge>
              <Badge variant="secondary">bathrooms</Badge>
              <Badge variant="secondary">area_m2</Badge>
              <Badge variant="secondary">parking_spaces</Badge>
              <Badge variant="secondary">furnished</Badge>
              <Badge variant="secondary">available</Badge>
              <Badge variant="secondary">images</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-brand-gradient">Exemplo de Payload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <code className="text-sm">
              <pre>{JSON.stringify(examplePayload, null, 2)}</pre>
            </code>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => copyToClipboard(JSON.stringify(examplePayload, null, 2))} 
            className="mt-4"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copiar Exemplo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
