
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTickets } from "@/hooks/useTickets";

export default function Tickets() {
  const [searchTerm, setSearchTerm] = useState("");
  const { tickets, loading } = useTickets();

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.property_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.requested_by.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
      case 'urgente':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baixa':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Sistema de Chamados</h1>
        <p className="text-muted-foreground">Gerencie os chamados dos funcionários</p>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Buscar por título, imóvel ou solicitante..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button>Filtrar</Button>
      </div>

      <div className="grid gap-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{ticket.title}</CardTitle>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Categoria</p>
                      <p className="font-medium">{ticket.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Imóvel</p>
                      <p className="font-medium">{ticket.property_address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Solicitante</p>
                      <p className="font-medium">{ticket.requested_by}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-medium">{ticket.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data</p>
                      <p className="font-medium">{new Date(ticket.created_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {ticket.status === 'open' ? 'Aberto' : ticket.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                  <Button variant="outline" size="sm">Atribuir</Button>
                  <Button variant="outline" size="sm">Fechar</Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">
                {searchTerm ? "Nenhum chamado encontrado para a busca." : "Nenhum chamado registrado."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
