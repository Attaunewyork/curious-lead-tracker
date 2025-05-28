
export default function Tickets() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Sistema de Chamados</h1>
        <p className="text-muted-foreground">Gerencie os chamados dos funcionários</p>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Chamados Abertos</h3>
        <p className="text-muted-foreground">Nenhum chamado registrado</p>
      </div>
    </div>
  );
}
