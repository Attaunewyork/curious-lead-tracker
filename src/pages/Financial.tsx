
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useExpenses } from "@/hooks/useExpenses";

const expenseSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.string().min(1, "Valor é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  expense_date: z.string().min(1, "Data é obrigatória"),
  property: z.string().optional(),
  vendor: z.string().optional(),
  notes: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function Financial() {
  const [isLoading, setIsLoading] = useState(false);
  const { expenses, createExpense } = useExpenses();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: "",
      expense_date: "",
      property: "",
      vendor: "",
      notes: "",
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    setIsLoading(true);
    try {
      const expenseData = {
        ...data,
        amount: parseFloat(data.amount.replace(/[^\d.,]/g, '').replace(',', '.')),
      };
      
      await createExpense(expenseData);
      form.reset();
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular totais
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Gestão Financeira</h1>
        <p className="text-muted-foreground">Controle suas finanças e receitas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Receitas do Mês</h3>
          <p className="text-2xl font-bold text-green-600">R$ 0,00</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Despesas do Mês</h3>
          <p className="text-2xl font-bold text-red-600">
            R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Saldo</h3>
          <p className="text-2xl font-bold text-blue-600">
            R$ {(-totalExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cadastro de Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Com o que foi gasto?</FormLabel>
                      <FormControl>
                        <Input placeholder="Descrição da despesa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quanto foi gasto?</FormLabel>
                        <FormControl>
                          <Input placeholder="R$ 0,00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expense_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quando foi gasto?</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" {...field}>
                          <option value="">Selecione uma categoria</option>
                          <option value="Manutenção">Manutenção</option>
                          <option value="Taxas">Taxas</option>
                          <option value="Material">Material</option>
                          <option value="Serviços">Serviços</option>
                          <option value="Combustível">Combustível</option>
                          <option value="Alimentação">Alimentação</option>
                          <option value="Transporte">Transporte</option>
                          <option value="Escritório">Escritório</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Outros">Outros</option>
                        </select>
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
                      <FormLabel>Imóvel (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço do imóvel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fornecedor (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do fornecedor" {...field} />
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
                      <FormLabel>Observações (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Observações sobre a despesa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Cadastrando..." : "Cadastrar Despesa"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Despesas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.length > 0 ? (
                expenses.slice(0, 5).map((expense) => (
                  <div key={expense.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{expense.description}</h4>
                      <span className="text-lg font-bold text-red-600">
                        R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Categoria: {expense.category}</p>
                      <p>Data: {new Date(expense.expense_date).toLocaleDateString('pt-BR')}</p>
                      {expense.property && <p>Imóvel: {expense.property}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center">Nenhuma despesa cadastrada</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
