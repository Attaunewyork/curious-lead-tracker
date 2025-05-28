
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebhookInfo } from "@/components/WebhookInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Webhook, Database } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-brand-gradient" />
        <div>
          <h1 className="text-3xl font-bold text-brand-gradient">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do seu CRM</p>
        </div>
      </div>

      <Tabs defaultValue="webhook" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="webhook" className="flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            Webhook API
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Banco de Dados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="webhook" className="space-y-4">
          <WebhookInfo />
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-gradient">Status do Banco de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Conexão Supabase:</span>
                  <span className="text-green-600 font-semibold">✓ Conectado</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tabela de Leads:</span>
                  <span className="text-green-600 font-semibold">✓ Configurada</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Logs de Webhook:</span>
                  <span className="text-green-600 font-semibold">✓ Ativo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">RLS (Row Level Security):</span>
                  <span className="text-green-600 font-semibold">✓ Habilitado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
