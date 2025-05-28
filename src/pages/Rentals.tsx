
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRentals } from "@/hooks/useRentals";

export default function Rentals() {
  const [searchTerm, setSearchTerm] = useState("");
  const { rentals, loading } = useRentals();

  const filteredRentals = rentals.filter(rental =>
    rental.property_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rental.tenant_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-brand-gradient">Controle de Locação</h1>
        <p className="text-muted-foreground">Gerencie os aluguéis dos seus imóveis</p>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Buscar por imóvel ou inquilino..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button>Filtrar</Button>
      </div>

      <div className="grid gap-4">
        {filteredRentals.length > 0 ? (
          filteredRentals.map((rental) => (
            <Card key={rental.id}>
              <CardHeader>
                <CardTitle className="text-lg">{rental.property_address}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Inquilino</p>
                    <p className="font-medium">{rental.tenant_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="font-medium text-green-600">
                      R$ {rental.rent_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Período</p>
                    <p className="font-medium">
                      {new Date(rental.start_date).toLocaleDateString('pt-BR')} - {new Date(rental.end_date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {rental.status === 'active' ? 'Ativo' : rental.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                  <Button variant="outline" size="sm">Gerar Recibo</Button>
                  <Button variant="outline" size="sm">Renovar</Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">
                {searchTerm ? "Nenhuma locação encontrada para a busca." : "Nenhuma locação cadastrada."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
