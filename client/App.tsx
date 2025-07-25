// src/main.tsx
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import ReferralDashboard from "@/pages/ReferralDashboard";
import Success from "./pages/Success";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referralCode = params.get("code");
    if (referralCode) {
      localStorage.setItem("referralCode", referralCode);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product" element={<Product />} />
            <Route path="/dashboard" element={<ReferralDashboard />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
