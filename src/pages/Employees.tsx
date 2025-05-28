
export default function Employees() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Cadastro de Funcionários</h1>
        <p className="text-muted-foreground">Gerencie seus funcionários</p>
      </div>

      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Lista de Funcionários</h3>
        <p className="text-muted-foreground">Nenhum funcionário cadastrado</p>
      </div>
    </div>
  );
}
