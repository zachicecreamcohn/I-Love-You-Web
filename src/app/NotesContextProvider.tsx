// Import React, useState, and useContext as you've done
import React, { useState, useContext, ReactNode } from 'react';

interface NotesContextType {
    allNotes: string[];
    setAllNotes: (notes: string[]) => void;
}

const NotesContext = React.createContext<NotesContextType | undefined>(undefined);

interface MyProviderProps {
    children: ReactNode; // This correctly types the children prop
}

export const NotesContextProvider: React.FC<MyProviderProps> = ({ children }) => {
    // Correct use of TypeScript with useState
    const [allNotes, setAllNotes] = useState<string[]>([]);

    const value: NotesContextType = {
        allNotes,
        setAllNotes,
    };

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
};


export function useNotesContext() {
    const context = useContext(NotesContext);

    if (context === undefined) {
        throw new Error('useNotesContext must be used within a NotesContextProvider');
    }

    return context;
}