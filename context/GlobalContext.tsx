'use client';

import {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import {useSession} from "next-auth/react";

// Define context types
interface GlobalContextType {
    unreadCount: number;
    setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

// Create Context with default value
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create Provider component
export function GlobalProvider({children}: { children: ReactNode }) {
    const [unreadCount, setUnreadCount] = useState(0);
    const {data: session} = useSession();

    useEffect(() => {
        if (session && session.user) {
            getUnreadMessageCount().then((res) => {
                if (res.count) setUnreadCount(res.count);
            });
        }
    }, [getUnreadMessageCount, session])
    return (
        <GlobalContext.Provider value={{unreadCount, setUnreadCount}}>
            {children}
        </GlobalContext.Provider>
    );
}

// Hook for accessing the GlobalContext
export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
}
