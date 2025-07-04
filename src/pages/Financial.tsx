
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useExpenses } from "@/hooks/useExpenses";
import { useRevenues } from "@/hooks/useRevenues";
import { RevenueForm } from "@/components/RevenueForm";

const expenseSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatória"),
  amount: z.string().min(1, "Valor é obrigatório"),
  expense_date: z.string().min(1, "Data é obrigatória"),
  property: z.string().optional(),
  vendor: z.string().optional(),
  notes: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function Financial() {
  const [isLoading, setIsLoading] = useState(false);
  const { expenses, createExpense } = useExpenses();
  const { revenues } = useRevenues();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      category: "",
      amount: "",
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
        category: data.category,
        amount: parseFloat(data.amount.replace(/[^\d.,]/g, '').replace(',', '.')),
        expense_date: data.expense_date,
        property: data.property || null,
        vendor: data.vendor || null,
        notes: data.notes || null,
      };
      
      await createExpense(expenseData);
      form.reset();
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalRevenues = revenues.reduce((sum, revenue) => sum + revenue.amount, 0);
  const balance = totalRevenues - totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Gestão Financeira</h1>
        <p className="text-muted-foreground">Controle suas receitas e despesas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Tabs defaultValue="expense" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expense">Despesa</TabsTrigger>
              <TabsTrigger value="revenue">Receita</TabsTrigger>
            </TabsList>
            
            <TabsContent value="expense" className="space-y-4">
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
                            <FormLabel>Com o que foi gasto</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Material de construção" {...field} />
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
                                <SelectItem value="manutencao">Manutenção</SelectItem>
                                <SelectItem value="material">Material</SelectItem>
                                <SelectItem value="servicos">Serviços</SelectItem>
                                <SelectItem value="reforma">Reforma</SelectItem>
                                <SelectItem value="impostos">Impostos</SelectItem>
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
                        name="expense_date"
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
                        name="vendor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fornecedor (opcional)</FormLabel>
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
                            <FormLabel>Observações (opcional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Observações adicionais..." {...field} />
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
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-4">
              <RevenueForm />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-700 dark:text-green-300">Total de Receitas</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    R$ {totalRevenues.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-700 dark:text-red-300">Total de Despesas</h3>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${balance >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-orange-50 dark:bg-orange-900/20'}`}>
                  <h3 className={`font-semibold ${balance >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300'}`}>Saldo</h3>
                  <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="expenses" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expenses">Despesas Recentes</TabsTrigger>
              <TabsTrigger value="revenues">Receitas Recentes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="expenses" className="space-y-4">
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
                            {expense.vendor && <p>Fornecedor: {expense.vendor}</p>}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center">Nenhuma despesa cadastrada</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="revenues" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Receitas Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenues.length > 0 ? (
                      revenues.slice(0, 5).map((revenue) => (
                        <div key={revenue.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{revenue.description}</h4>
                            <span className="text-lg font-bold text-green-600">
                              R$ {revenue.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>Categoria: {revenue.category}</p>
                            <p>Data: {new Date(revenue.revenue_date).toLocaleDateString('pt-BR')}</p>
                            {revenue.property && <p>Imóvel: {revenue.property}</p>}
                            {revenue.source && <p>Fonte: {revenue.source}</p>}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center">Nenhuma receita cadastrada</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
