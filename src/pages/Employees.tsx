import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEmployees } from "@/hooks/useEmployees";
import { ImageUpload } from "@/components/ImageUpload";

const employeeSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF deve ter 11 dígitos"),
  rg: z.string().min(1, "RG é obrigatório"),
  phone: z.string().min(10, "Telefone é obrigatório"),
  email: z.string().email("Email inválido"),
  address: z.string().min(1, "Endereço é obrigatório"),
  position: z.string().min(1, "Cargo é obrigatório"),
  salary: z.string().min(1, "Salário é obrigatório"),
  start_date: z.string().min(1, "Data de admissão é obrigatória"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export default function Employees() {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeImages, setEmployeeImages] = useState<string[]>([]);
  const { employees, createEmployee } = useEmployees();

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      cpf: "",
      rg: "",
      phone: "",
      email: "",
      address: "",
      position: "",
      salary: "",
      start_date: "",
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    setIsLoading(true);
    try {
      const employeeData = {
        name: data.name,
        cpf: data.cpf,
        rg: data.rg,
        phone: data.phone,
        email: data.email,
        address: data.address,
        position: data.position,
        salary: parseFloat(data.salary.replace(/[^\d.,]/g, '').replace(',', '.')),
        start_date: data.start_date,
      };
      
      await createEmployee(employeeData);
      form.reset();
      setEmployeeImages([]);
    } catch (error) {
      console.error('Error submitting employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Cadastro de Funcionários</h1>
        <p className="text-muted-foreground">Gerencie seus funcionários</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Novo Funcionário</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <FormLabel>Foto do Funcionário</FormLabel>
                    <ImageUpload
                      images={employeeImages}
                      onImagesChange={setEmployeeImages}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RG</FormLabel>
                        <FormControl>
                          <Input placeholder="00.000.000-0" {...field} />
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
                          <Input placeholder="(00) 00000-0000" {...field} />
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
                          <Input type="email" placeholder="email@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cargo</FormLabel>
                        <FormControl>
                          <Input placeholder="Cargo do funcionário" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salário</FormLabel>
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
                        <FormLabel>Data de Admissão</FormLabel>
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Cadastrando..." : "Cadastrar Funcionário"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funcionários Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.length > 0 ? (
                employees.slice(0, 5).map((employee) => (
                  <div key={employee.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{employee.name}</h4>
                      <span className="text-sm text-muted-foreground">{employee.position}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Email: {employee.email}</p>
                      <p>Telefone: {employee.phone}</p>
                      <p>Salário: R$ {employee.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center">Nenhum funcionário cadastrado</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
