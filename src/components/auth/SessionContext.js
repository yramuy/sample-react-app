import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [sessionData, setSessionData] = useState(null);
    const [userId, setUserId] = useState(0);

    const setSession = (data,userId) => {
        setSessionData(data);
        setUserId(userId);
    };

    return (
        <SessionContext.Provider value={{ sessionData, setSession, userId }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext); 

    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
      }

    return context;
};