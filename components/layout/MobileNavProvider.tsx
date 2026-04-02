"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface MobileNavContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  aiPanelOpen: boolean;
  setAiPanelOpen: (open: boolean) => void;
}

const MobileNavContext = createContext<MobileNavContextType | null>(null);

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpenState] = useState(false);
  const [aiPanelOpen, setAiPanelOpenState] = useState(false);

  const setSidebarOpen = useCallback((open: boolean) => {
    setSidebarOpenState(open);
    if (open) setAiPanelOpenState(false);
  }, []);

  const setAiPanelOpen = useCallback((open: boolean) => {
    setAiPanelOpenState(open);
    if (open) setSidebarOpenState(false);
  }, []);

  return (
    <MobileNavContext.Provider value={{ sidebarOpen, setSidebarOpen, aiPanelOpen, setAiPanelOpen }}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function useMobileNav() {
  const ctx = useContext(MobileNavContext);
  if (!ctx) throw new Error("useMobileNav must be used within MobileNavProvider");
  return ctx;
}
