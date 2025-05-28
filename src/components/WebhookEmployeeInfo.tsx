
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Webhook, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function WebhookEmployeeInfo() {
  const { toast } = useToast();

  const webhookUrl = 'https://ijfkhyeljrxbkspgqewl.supabase.co/functions/v1/webhook-employee';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "URL do webhook copiada para a área de transferência."
    });
  };

  const examplePayload = {
    name: "Maria Silva",
    cpf: "000.000.000-00",
    rg: "00.000.000-0",
    phone: "(11) 99999-9999",
    email: "maria@empresa.com",
    address: "Rua das Flores, 123",
    position: "Desenvolvedora",
    salary: "5000.00",
    start_date: "2024-01-15"
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-gradient">
            <Webhook className="w-5 h-5" />
            API Webhook - Funcionários
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
            <div className="flex gap-2 flex-wrap">
              <Badge variant="destructive">name</Badge>
              <Badge variant="destructive">email</Badge>
              <Badge variant="destructive">cpf</Badge>
              <Badge variant="destructive">position</Badge>
              <Badge variant="destructive">salary</Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Campos Opcionais:
            </label>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">rg</Badge>
              <Badge variant="secondary">phone</Badge>
              <Badge variant="secondary">address</Badge>
              <Badge variant="secondary">start_date</Badge>
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
