
import { Calculator, Building, Wrench, Users, UserPlus, FileText, ClipboardList, Receipt, Home, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home
  },
  {
    title: "Gestão Financeira",
    url: "/financial",
    icon: Calculator
  },
  {
    title: "Controle de Locação",
    url: "/rentals",
    icon: Building
  },
  {
    title: "Cadastro de Locação",
    url: "/rental-registration",
    icon: FileText
  },
  {
    title: "Sistema de Chamados",
    url: "/tickets",
    icon: Wrench
  },
  {
    title: "Cadastro de Chamados",
    url: "/ticket-registration",
    icon: ClipboardList
  },
  {
    title: "Cadastro de Clientes",
    url: "/clients",
    icon: Users
  },
  {
    title: "Cadastro de Funcionários",
    url: "/employees",
    icon: UserPlus
  },
  {
    title: "Cadastro de Despesas",
    url: "/expenses",
    icon: Receipt
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-brand-gradient text-white shadow-lg transform scale-105"
        : "hover:bg-accent text-foreground hover:text-brand-orange"
    }`;

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r bg-background/80 backdrop-blur-sm`}>
      <SidebarContent className="p-4 bg-zinc-950">
        <div className="mb-6">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <img 
              src="/lovable-uploads/7cf36992-8d96-4c07-8be8-7062cfc8eaca.png" 
              alt="ImovAI Logo" 
              className="w-8 h-8 rounded-full" 
            />
            {!collapsed && (
              <span className="font-bold text-lg bg-brand-gradient bg-clip-text text-transparent">
                ImovAI
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "sr-only" : ""} text-foreground`}>
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavCls}
                    >
                      <item.icon className="w-5 h-5 min-w-[1.25rem]" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
