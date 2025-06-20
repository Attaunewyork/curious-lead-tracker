
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
import RentalRegistration from "./pages/RentalRegistration";
import TicketRegistration from "./pages/TicketRegistration";
import Tickets from "./pages/Tickets";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import Properties from "./pages/Properties";
import NewProperty from "./pages/NewProperty";
import PublicProperties from "./pages/PublicProperties";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Expenses from "./pages/Expenses";
import ScheduledVisits from "./pages/ScheduledVisits";

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
            <Route path="/imoveis" element={<PublicProperties />} />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/financial" element={<Financial />} />
                  <Route path="/rentals" element={<Rentals />} />
                  <Route path="/rental-registration" element={<RentalRegistration />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/ticket-registration" element={<TicketRegistration />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/new" element={<NewProperty />} />
                  <Route path="/scheduled-visits" element={<ScheduledVisits />} />
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
