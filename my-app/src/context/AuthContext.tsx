import React, { useContext, useState, useEffect, createContext, type ReactNode } from 'react';
import axios from 'axios';

interface User {
    // Define your user properties here
    id: string;
    email: string;
    // Add other user fields as needed
}

interface AuthContextType {
    currentUser: User | null;
    login: (email: string, password: string) => Promise<any>;
    register: (email: string, password: string) => Promise<any>;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    login: async () => { throw new Error('login not implemented'); },
    register: async () => { throw new Error('register not implemented'); },
    logout: () => { throw new Error('logout not implemented'); },
    fetchUser: async () => { throw new Error('fetchUser not implemented'); }
});

export function useAuth(): AuthContextType {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function login(email: string, password: string): Promise<any> {
        const response = await axios.post(
            'http://localhost:8000/auth/token',
            new URLSearchParams({ username: email, password }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        const { access_token } = response.data;
        localStorage.setItem('token', access_token);
        await fetchUser();
        return response.data;
    }

    async function register(email: string, password: string): Promise<any> {
        const response = await axios.post('http://localhost:8000/auth/register', {
            email,
            password
        });
        return response.data;
    }

    function logout(): void {
        localStorage.removeItem('token');
        setCurrentUser(null);
    }

    async function fetchUser(): Promise<void> {
        const token = localStorage.getItem('token');
        if (!token) {
            setCurrentUser(null);
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCurrentUser(response.data);
        } catch (error) {
            logout();
        }
    }

    useEffect(() => {
        fetchUser().finally(() => setLoading(false));
    }, []);

    const value: AuthContextType = {
        currentUser,
        login,
        register,
        logout,
        fetchUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}