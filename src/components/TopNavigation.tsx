
import { BarChart3, Users, Plus, Home, Settings, Building2, PlusCircle } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home
  },
  {
    title: "Leads",
    url: "/leads",
    icon: Users
  },
  {
    title: "Novo Lead",
    url: "/leads/new",
    icon: Plus
  },
  {
    title: "Seus Imóveis",
    url: "/properties",
    icon: Building2
  },
  {
    title: "Novo Imóvel",
    url: "/properties/new",
    icon: PlusCircle
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: BarChart3
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings
  }
];

interface TopNavigationProps {
  onItemClick?: () => void;
}

export function TopNavigation({ onItemClick }: TopNavigationProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <nav className="flex flex-col md:flex-row gap-2 md:gap-1 p-4 md:p-0">
      {items.map((item) => (
        <NavLink
          key={item.title}
          to={item.url}
          end={item.url === "/"}
          onClick={onItemClick}
          className={({ isActive: navIsActive }) =>
            `flex items-center gap-3 md:gap-2 px-4 md:px-3 py-3 md:py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
              isActive(item.url)
                ? "bg-brand-gradient text-white shadow-lg"
                : "hover:bg-accent text-foreground hover:text-brand-orange"
            }`
          }
        >
          <item.icon className="w-4 h-4 min-w-[1rem]" />
          <span>{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
}
