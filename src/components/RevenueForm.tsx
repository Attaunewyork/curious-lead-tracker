
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRevenues } from "@/hooks/useRevenues";

const revenueSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatória"),
  amount: z.string().min(1, "Valor é obrigatório"),
  revenue_date: z.string().min(1, "Data é obrigatória"),
  property: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
});

type RevenueFormData = z.infer<typeof revenueSchema>;

export function RevenueForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { createRevenue } = useRevenues();

  const form = useForm<RevenueFormData>({
    resolver: zodResolver(revenueSchema),
    defaultValues: {
      description: "",
      category: "",
      amount: "",
      revenue_date: "",
      property: "",
      source: "",
      notes: "",
    },
  });

  const onSubmit = async (data: RevenueFormData) => {
    setIsLoading(true);
    try {
      const revenueData = {
        description: data.description,
        category: data.category,
        amount: parseFloat(data.amount.replace(/[^\d.,]/g, '').replace(',', '.')),
        revenue_date: data.revenue_date,
        property: data.property || null,
        source: data.source || null,
        notes: data.notes || null,
      };
      
      await createRevenue(revenueData);
      form.reset();
    } catch (error) {
      console.error('Error submitting revenue:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Receita</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origem da receita</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Aluguel do apartamento" {...field} />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="aluguel">Aluguel</SelectItem>
                      <SelectItem value="venda">Venda</SelectItem>
                      <SelectItem value="comissao">Comissão</SelectItem>
                      <SelectItem value="consultoria">Consultoria</SelectItem>
                      <SelectItem value="administracao">Administração</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quanto (R$)</FormLabel>
                  <FormControl>
                    <Input placeholder="R$ 0,00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="revenue_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quando</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="property"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imóvel (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço do imóvel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fonte (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Cliente ou fonte da receita" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Observações adicionais..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Cadastrando..." : "Cadastrar Receita"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
