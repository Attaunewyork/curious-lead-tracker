
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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

export default function Expenses() {
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
        description: data.description,
        amount: parseFloat(data.amount.replace(/[^\d.,]/g, '').replace(',', '.')),
        category: data.category,
        expense_date: data.expense_date,
        property: data.property || undefined,
        vendor: data.vendor || undefined,
        notes: data.notes || undefined,
      };
      
      await createExpense(expenseData);
      form.reset();
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Cadastro de Despesas</h1>
        <p className="text-muted-foreground">Gerencie suas despesas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nova Despesa</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                  name="expense_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Imóvel</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Fornecedor</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
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
