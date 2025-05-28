import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRentals } from "@/hooks/useRentals";

const rentalSchema = z.object({
  property_address: z.string().min(1, "Endereço do imóvel é obrigatório"),
  tenant_name: z.string().min(1, "Nome do locatário é obrigatório"),
  tenant_cpf: z.string().min(11, "CPF do locatário é obrigatório"),
  tenant_phone: z.string().min(10, "Telefone do locatário é obrigatório"),
  tenant_email: z.string().email("Email inválido"),
  rent_value: z.string().min(1, "Valor do aluguel é obrigatório"),
  start_date: z.string().min(1, "Data de início é obrigatória"),
  end_date: z.string().min(1, "Data de fim é obrigatória"),
  deposit: z.string().optional(),
  observations: z.string().optional(),
});

type RentalFormData = z.infer<typeof rentalSchema>;

export default function RentalRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const { createRental } = useRentals();

  const form = useForm<RentalFormData>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      property_address: "",
      tenant_name: "",
      tenant_cpf: "",
      tenant_phone: "",
      tenant_email: "",
      rent_value: "",
      start_date: "",
      end_date: "",
      deposit: "",
      observations: "",
    },
  });

  const onSubmit = async (data: RentalFormData) => {
    setIsLoading(true);
    try {
      const rentalData = {
        property_address: data.property_address,
        tenant_name: data.tenant_name,
        tenant_cpf: data.tenant_cpf,
        tenant_phone: data.tenant_phone,
        tenant_email: data.tenant_email,
        rent_value: parseFloat(data.rent_value.replace(/[^\d.,]/g, '').replace(',', '.')),
        start_date: data.start_date,
        end_date: data.end_date,
        deposit: data.deposit ? parseFloat(data.deposit.replace(/[^\d.,]/g, '').replace(',', '.')) : 0,
        observations: data.observations || null,
        status: 'active',
      };
      
      await createRental(rentalData);
      form.reset();
    } catch (error) {
      console.error('Error submitting rental:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Cadastro de Locação</h1>
        <p className="text-muted-foreground">Registre uma nova locação</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Nova Locação</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="property_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço do Imóvel</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tenant_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Inquilino</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tenant_cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF do Inquilino</FormLabel>
                      <FormControl>
                        <Input placeholder="000.000.000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tenant_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tenant_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rent_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Aluguel</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 0,00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Início</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Fim</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deposit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor da Caução (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 0,00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Observações sobre a locação" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Cadastrando..." : "Cadastrar Locação"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
