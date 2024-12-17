"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MoodContextType, MoodKey } from "../data/interfaces";

// Create the MoodContext
const MoodContext = createContext<MoodContextType | undefined>(undefined);

interface MoodProviderProps {
  children: ReactNode;
}

export const MoodProvider = ({ children }: MoodProviderProps) => {
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null); // Mood state

  return (
    <MoodContext.Provider value={{ selectedMood, setSelectedMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = (): MoodContextType => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};