import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  session: { user: User, token: string } | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  setSession: (session: { user: User, token: string } | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<{ user: User, token: string } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('scheme_setu_token');
      if (token) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            const sessionData = { user: data.user, token };
            setSession(sessionData);
            setUser(data.user);
          } else {
            localStorage.removeItem('scheme_setu_token');
          }
        } catch (error) {
          console.error("Auth init error:", error);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const handleSetSession = (newSession: { user: User, token: string } | null) => {
    if (newSession) {
      localStorage.setItem('scheme_setu_token', newSession.token);
      setSession(newSession);
      setUser(newSession.user);
    } else {
      localStorage.removeItem('scheme_setu_token');
      setSession(null);
      setUser(null);
    }
  };

  const signOut = async () => {
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
