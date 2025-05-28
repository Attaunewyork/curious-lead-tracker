
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, loading, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm shadow-sm flex items-center justify-between px-6">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/7cf36992-8d96-4c07-8be8-7062cfc8eaca.png" 
                  alt="ImovAI Logo" 
                  className="w-8 h-8 rounded-full"
                />
                <h1 className="text-xl font-semibold bg-brand-gradient bg-clip-text text-transparent">
                  ImovAI - CRM
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              {user && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={signOut}
                    className="h-9 w-9"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Sair</span>
                  </Button>
                </div>
              )}
            </div>
          </header>
          <div className="flex-1 p-6 bg-background">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
