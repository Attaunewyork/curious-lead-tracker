
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Financial from "./pages/Financial";
import Rentals from "./pages/Rentals";
import Tickets from "./pages/Tickets";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import Properties from "./pages/Properties";
import NewProperty from "./pages/NewProperty";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create QueryClient inside the component to ensure proper React context
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/financial" element={<Financial />} />
                  <Route path="/rentals" element={<Rentals />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/new" element={<NewProperty />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
