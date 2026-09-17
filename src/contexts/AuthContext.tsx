import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  session: { user: User } | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  setSession: (session: { user: User } | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSessionState] = useState<{ user: User } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clear legacy XSS-prone token storage
    localStorage.removeItem('scheme_setu_token');

    const initAuth = async () => {
      try {
        const res = await apiFetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setSessionState({ user: data.user });
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth init error:', error);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const handleSetSession = (newSession: { user: User } | null) => {
    setSessionState(newSession);
    setUser(newSession?.user ?? null);
  };

  const signOut = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    handleSetSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, isLoading, signOut, setSession: handleSetSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
