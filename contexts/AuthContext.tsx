import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise';
  tenantId: string;
  region: 'IN' | 'US' | 'EU' | 'AE';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  setRegion: (region: 'IN' | 'US' | 'EU' | 'AE') => void;
  upgradePlan: (plan: User['plan']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        plan: 'free',
        tenantId: 'tenant-123',
        region: 'IN'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const setRegion = (region: 'IN' | 'US' | 'EU' | 'AE') => {
    if (user) {
      const updated = { ...user, region };
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    }
  };

  const upgradePlan = (plan: User['plan']) => {
    if (user) {
      const updated = { ...user, plan };
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, setRegion, upgradePlan }}>
      {children}
    </AuthContext.Provider>
  );
};
