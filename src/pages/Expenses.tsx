
export default function Expenses() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Cadastro de Despesas</h1>
        <p className="text-muted-foreground">Gerencie suas despesas</p>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Despesas</h3>
        <p className="text-muted-foreground">Nenhuma despesa cadastrada</p>
      </div>
    </div>
  );
}
