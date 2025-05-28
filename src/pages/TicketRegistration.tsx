import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useTickets } from "@/hooks/useTickets";

const ticketSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  priority: z.enum(["baixa", "media", "alta", "urgente"]),
  category: z.string().min(1, "Categoria é obrigatória"),
  property_address: z.string().min(1, "Endereço do imóvel é obrigatório"),
  requested_by: z.string().min(1, "Solicitante é obrigatório"),
  phone: z.string().min(10, "Telefone é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
});

type TicketFormData = z.infer<typeof ticketSchema>;

export default function TicketRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const { createTicket } = useTickets();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "media",
      category: "",
      property_address: "",
      requested_by: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: TicketFormData) => {
    setIsLoading(true);
    try {
      const ticketData = {
        ...data,
        status: 'open'
      };
      
      await createTicket(ticketData);
      form.reset();
    } catch (error) {
      console.error('Error submitting ticket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Cadastro de Chamados</h1>
        <p className="text-muted-foreground">Registre novos chamados</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novo Chamado</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade</FormLabel>
                    <FormControl>
                      <select {...field}>
                        <option value="baixa">Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                        <option value="urgente">Urgente</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="property_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço do imóvel</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requested_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solicitante</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Registrando..." : "Registrar Chamado"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
