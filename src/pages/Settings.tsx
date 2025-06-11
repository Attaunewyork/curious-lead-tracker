
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebhookInfo } from "@/components/WebhookInfo";
import { WebhookEmployeeInfo } from "@/components/WebhookEmployeeInfo";
import { WebhookPropertyInfo } from "@/components/WebhookPropertyInfo";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Configurações</h1>
        <p className="text-muted-foreground">Configure integrações e APIs</p>
      </div>

      <Tabs defaultValue="webhook-clients" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="webhook-clients">Webhook Clientes</TabsTrigger>
          <TabsTrigger value="webhook-employees">Webhook Funcionários</TabsTrigger>
          <TabsTrigger value="webhook-properties">Webhook Imóveis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="webhook-clients" className="space-y-4">
          <WebhookInfo />
        </TabsContent>
        
        <TabsContent value="webhook-employees" className="space-y-4">
          <WebhookEmployeeInfo />
        </TabsContent>
        
        <TabsContent value="webhook-properties" className="space-y-4">
          <WebhookPropertyInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
