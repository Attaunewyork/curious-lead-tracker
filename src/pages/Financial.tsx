
export default function Financial() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gradient">Gestão Financeira</h1>
        <p className="text-muted-foreground">Controle suas finanças e receitas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Receitas do Mês</h3>
          <p className="text-2xl font-bold text-green-600">R$ 0,00</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Despesas do Mês</h3>
          <p className="text-2xl font-bold text-red-600">R$ 0,00</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Saldo</h3>
          <p className="text-2xl font-bold text-blue-600">R$ 0,00</p>
        </div>
      </div>
    </div>
  );
}
