import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImmoplusLayout from "./pages/immoplus/ImmoplusLayout";
import ImmoplusHome from "./pages/immoplus/ImmoplusHome";
import ImmoplusAbout from "./pages/immoplus/ImmoplusAbout";
import ImmoplusProperties from "./pages/immoplus/ImmoplusProperties";
import ImmoplusServices from "./pages/immoplus/ImmoplusServices";
import ImmoplusContact from "./pages/immoplus/ImmoplusContact";
import Index from "./pages/Index";
import Preview from "./pages/Preview";
import GeneratedSite from "./pages/GeneratedSite";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImmoplusLayout />}>
            <Route index element={<ImmoplusHome />} />
            <Route path="nos-biens" element={<ImmoplusProperties />} />
            <Route path="nos-services" element={<ImmoplusServices />} />
            <Route path="a-propos" element={<ImmoplusAbout />} />
            <Route path="contact" element={<ImmoplusContact />} />
          </Route>
          <Route path="/factory" element={<Index />} />
          <Route path="/preview/:slug" element={<Preview />} />
          <Route path="/site/:slug" element={<GeneratedSite />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
