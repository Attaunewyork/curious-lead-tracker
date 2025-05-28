
export default function Rentals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Controle de Locação</h1>
        <p className="text-muted-foreground">Gerencie os aluguéis dos seus imóveis</p>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Imóveis Alugados</h3>
        <p className="text-muted-foreground">Nenhum imóvel alugado cadastrado</p>
      </div>
    </div>
  );
}
