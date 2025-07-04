"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

type DashboardContextType = {
  isLoading: boolean;
  generatedEmail: { subject: string; body: string } | null;
  generateEmail: (prompt: string) => Promise<void>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);

  const generateEmail = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/generateEmail", { prompt });
      setGeneratedEmail(response.data);
    } catch (error) {
      console.error("Error generando email:", error);
      alert("Error generando email.");
    } finally {
      setIsLoading(false);
    }
  };

  const value: DashboardContextType = {
    isLoading,
    generatedEmail,
    generateEmail
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard debe usarse dentro de <DashboardProvider>");
  }
  return context;
};