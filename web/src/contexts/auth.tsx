import React, { createContext, useState, useEffect, useContext } from 'react';

import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
};

interface AuthContextData {
  loggedIn: boolean;
  user: User | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorageData() {
      const storageUser = localStorage.getItem('@Happy:user');
      const storageToken = localStorage.getItem('@Happy:token');

      if (storageUser && storageToken) {
        api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else {  // not yet authenticated
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  async function login(email: string, password: string) {
    const response = await auth.login(email, password);

    setUser(response.user);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    localStorage.setItem('@Happy:user', JSON.stringify(response.user));
    localStorage.setItem('@Happy:token', response.token);
  };

  function logout() {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ loggedIn: !!user, user, loading, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
};