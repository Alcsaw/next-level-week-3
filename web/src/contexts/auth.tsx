import React, { createContext, useState, useEffect, useContext } from 'react';

import * as auth from '../services/auth';
import api from '../services/api';

interface Representative {
  id: number;
  name: string;
  email: string;
};

interface AuthContextData {
  loggedIn: boolean;
  representative: Representative | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [representative, setRepresentative] = useState<Representative | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorageData() {
      const storageRepresentative = localStorage.getItem('@Happy:representative');
      const storageToken = localStorage.getItem('@Happy:token');

      if (storageRepresentative && storageToken) {
        api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

        setRepresentative(JSON.parse(storageRepresentative));
        setLoading(false);
      } else {  // not yet authenticated
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  async function login(email: string, password: string) {
    const response = await auth.login(email, password);

    setRepresentative(response.representative);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    localStorage.setItem('@Happy:representative', JSON.stringify(response.representative));
    localStorage.setItem('@Happy:token', response.token);
  };

  function logout() {
    setRepresentative(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ loggedIn: !!representative, representative, loading, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
};
