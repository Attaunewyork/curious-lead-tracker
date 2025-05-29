import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Phone } from "lucide-react";

const visitSchema = z.object({
  client_name: z.string().min(1, "Nome do cliente é obrigatório"),
  client_phone: z.string().min(10, "Telefone é obrigatório"),
  property_address: z.string().min(1, "Endereço do imóvel é obrigatório"),
  visit_date: z.string().min(1, "Data da visita é obrigatória"),
  visit_time: z.string().min(1, "Hora da visita é obrigatória"),
  notes: z.string().optional(),
});

type VisitFormData = z.infer<typeof visitSchema>;

interface Visit {
  id: number;
  client_name: string;
  client_phone: string;
  property_address: string;
  visit_date: string;
  visit_time: string;
  status: string;
  notes: string;
}

const mockVisits: Visit[] = [
  {
    id: 1,
    client_name: "João Silva",
    client_phone: "(11) 99999-9999",
    property_address: "Rua das Flores, 123",
    visit_date: "2024-01-15",
    visit_time: "14:00",
    status: "agendada",
    notes: "Cliente interessado em apartamento 2 quartos"
  },
  {
    id: 2,
    client_name: "Maria Santos",
    client_phone: "(11) 88888-8888",
    property_address: "Av. Paulista, 456",
    visit_date: "2024-01-16",
    visit_time: "10:30",
    status: "confirmada",
    notes: "Visita para casa com 3 quartos"
  }
];

export default function ScheduledVisits() {
  const [isLoading, setIsLoading] = useState(false);
  const [visits, setVisits] = useState<Visit[]>(mockVisits);

  const form = useForm<VisitFormData>({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      client_name: "",
      client_phone: "",
      property_address: "",
      visit_date: "",
      visit_time: "",
      notes: "",
    },
  });

  const onSubmit = async (data: VisitFormData) => {
    setIsLoading(true);
    try {
      const newVisit: Visit = {
        id: visits.length + 1,
        client_name: data.client_name,
        client_phone: data.client_phone,
        property_address: data.property_address,
        visit_date: data.visit_date,
        visit_time: data.visit_time,
        notes: data.notes || "",
        status: "agendada"
      };
      setVisits([...visits, newVisit]);
      form.reset();
    } catch (error) {
      console.error('Error submitting visit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'realizada':
        return 'bg-blue-100 text-blue-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Visitas Agendadas</h1>
        <p className="text-muted-foreground">Gerencie as visitas aos imóveis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Agendar Nova Visita</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="client_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="client_phone"
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

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="visit_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visit_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Observações sobre a visita" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Agendando..." : "Agendar Visita"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Visitas Agendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visits.map((visit) => (
                  <div key={visit.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{visit.client_name}</span>
                      </div>
                      <Badge className={getStatusColor(visit.status)}>
                        {visit.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{visit.client_phone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{visit.property_address}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(visit.visit_date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{visit.visit_time}</span>
                      </div>
                    </div>

                    {visit.notes && (
                      <div className="text-sm bg-muted p-2 rounded">
                        <strong>Observações:</strong> {visit.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
