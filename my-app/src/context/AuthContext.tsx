import React, { createContext, useContext, useEffect, useState } from 'react';

// Utility function to set HTTP-only cookie (client-side simulation)
const setHttpOnlyCookie = (name: string, value: string, days: number = 7) => {
    const maxAge = days * 86400;
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; Secure; SameSite=Strict`;
    console.log(`Cookie set: ${name} (expires in ${days} days)`);
};

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: (token: string, userData: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        if (userData) {
            // console.log('Restoring user from sessionStorage:', userData);
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token: string, userData: any) => {
        setHttpOnlyCookie('authToken', token, 7);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        document.cookie = 'authToken=; max-age=0; path=/; Secure; SameSite=Strict';
        sessionStorage.removeItem('userData');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};