"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define interfaces for your data structures

interface AppContextValue {
  user: ReturnType<typeof useUser>["user"];
  userId: string | null | undefined;
  isLoaded: boolean;
 
}


interface AppProviderProps {
  children: ReactNode;
}

// API response types

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { user } = useUser();
  const { userId, isLoaded } = useAuth();
 
    
  
  const value: AppContextValue = {
    user,
    userId,
    isLoaded,
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => useContext(AppContext);