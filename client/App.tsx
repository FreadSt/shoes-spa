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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import ReferralDashboard from "@/pages/ReferralDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster /> {/* Убрали Sonner, так как два тостера избыточны */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product" element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ReferralDashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} /> {/* 404 для всех остальных маршрутов */}
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
