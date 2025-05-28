import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Webhook, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
export function WebhookInfo() {
  const {
    toast
  } = useToast();
  const webhookUrl = 'https://ijfkhyeljrxbkspgqewl.supabase.co/functions/v1/webhook-lead';
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "URL do webhook copiada para a área de transferência."
    });
  };
  const examplePayload = {
    name: "João Silva",
    email: "joao@empresa.com",
    phone: "(11) 99999-9999",
    company: "Tech Solutions",
    status: "new",
    source: "Website",
    value: 15000,
    notes: "Interessado em consultoria"
  };
  return <div className="space-y-6">
      <Card className="bg-zinc-950">
        <CardHeader className="bg-zinc-950">
          <CardTitle className="flex items-center gap-2">
            <Webhook className="w-5 h-5" />
            API Webhook
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-zinc-950">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              URL do Webhook:
            </label>
            <div className="flex items-center gap-2">
              <code className="bg-gray-100 px-3 py-2 rounded text-sm flex-1 font-mono">
                {webhookUrl}
              </code>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(webhookUrl)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">POST</Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              Ativo
            </Badge>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Campos Obrigatórios:
            </label>
            <div className="flex gap-2">
              <Badge variant="destructive">name</Badge>
              <Badge variant="destructive">email</Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Campos Opcionais:
            </label>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">phone</Badge>
              <Badge variant="secondary">company</Badge>
              <Badge variant="secondary">status</Badge>
              <Badge variant="secondary">source</Badge>
              <Badge variant="secondary">value</Badge>
              <Badge variant="secondary">notes</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-zinc-950 hover:bg-zinc-800 text-zinc-50">
          <CardTitle>Exemplo de Payload</CardTitle>
        </CardHeader>
        <CardContent className="bg-zinc-950">
          <div className="bg-gray-50 p-4 rounded-lg">
            <code className="text-sm">
              <pre>{JSON.stringify(examplePayload, null, 2)}</pre>
            </code>
          </div>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(examplePayload, null, 2))} className="mt-4 text-zinc-950">
            <Copy className="w-4 h-4 mr-2" />
            Copiar Exemplo
          </Button>
        </CardContent>
      </Card>
    </div>;
}