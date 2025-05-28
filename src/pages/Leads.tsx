
import { useState } from 'react';
import { Plus, Search, Filter, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LeadCard } from '@/components/LeadCard';
import { useLeads } from '@/hooks/useLeads';
import { Lead, LeadStatus, leadStatusLabels } from '@/types/lead';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const { leads, loading, deleteLead } = useLeads();
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (lead: Lead) => {
    navigate(`/leads/edit/${lead.id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este lead?')) {
      deleteLead(id);
      toast({
        title: "Lead excluído",
        description: "O lead foi removido com sucesso.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8360]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-gradient mb-2">Leads</h1>
          <p className="text-muted-foreground">Gerencie todos os seus leads em um só lugar</p>
        </div>
        <Button 
          onClick={() => navigate('/leads/new')}
          className="bg-gradient-to-r from-[#FF8360] to-[#FF3C7E] hover:from-[#e6755a] hover:to-[#e63571] text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as LeadStatus | 'all')}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(leadStatusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lista de leads */}
      {filteredLeads.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-[#FF8360]/20 to-[#FF3C7E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-[#FF8360]" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-brand-gradient">
            {searchTerm || statusFilter !== 'all' ? 'Nenhum lead encontrado' : 'Nenhum lead cadastrado'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Tente ajustar os filtros de busca' 
              : 'Comece adicionando seu primeiro lead'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button 
              onClick={() => navigate('/leads/new')}
              className="bg-gradient-to-r from-[#FF8360] to-[#FF3C7E] hover:from-[#e6755a] hover:to-[#e63571] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Lead
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
