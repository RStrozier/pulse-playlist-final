"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { ToggleContextType } from '../data/interfaces';

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

interface ToggleProviderProps {
    children: ReactNode;
}

// Create the provider component
export const ToggleProvider: React.FC<ToggleProviderProps> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    const showAlert = () => {
        setAlertOpen(true);
    };

    const handleAlertClose = () => {
        console.log("Closing modal");
        setAlertOpen(false);
    };

    return (
        <ToggleContext.Provider value={{ isExpanded, alertOpen, 
            toggleExpand, handleAlertClose, handleAlertOpen, showAlert }}>
            {children}
        </ToggleContext.Provider>
    );
};

// Create a custom hook for using the ToggleContext
export const useToggle = (): ToggleContextType => {
    const context = useContext(ToggleContext);
    if (!context) {
        throw new Error("useToggle must be used within a ToggleProvider");
    }
    return context;
};