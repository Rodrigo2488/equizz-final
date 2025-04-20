'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Definir o tipo de usuário
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Definir o contexto de autenticação
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, isAdmin: boolean) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
}

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Usuários padrão para teste
const DEFAULT_USERS = [
  {
    id: 'user-1',
    name: 'Usuário Teste',
    email: 'teste@exemplo.com',
    password: 'senha123',
    isAdmin: false
  },
  {
    id: 'admin-1',
    name: 'Administrador',
    email: 'admin@exemplo.com',
    password: 'senha123',
    isAdmin: true
  }
];

// Componente provedor
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Inicializar usuários padrão no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized) {
      try {
        // Verificar se já existem usuários no localStorage
        const storedUsers = localStorage.getItem('users');
        if (!storedUsers) {
          // Se não existirem, inicializar com os usuários padrão
          localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
        }

        // Verificar se há um usuário logado
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser({
            id: parsedUser.id,
            name: parsedUser.name,
            email: parsedUser.email,
            isAdmin: parsedUser.isAdmin
          });
        }

        setInitialized(true);
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
      }
    }
  }, [initialized]);

  // Função de login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Obter usuários do localStorage
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Encontrar usuário com email e senha correspondentes
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        // Criar objeto de usuário sem a senha
        const loggedUser = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin
        };

        // Salvar usuário no estado e no localStorage
        setUser(loggedUser);
        localStorage.setItem('currentUser', JSON.stringify(loggedUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  // Função de cadastro
  const signup = async (
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
  ): Promise<boolean> => {
    try {
      // Obter usuários do localStorage
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Verificar se já existe um usuário com o mesmo email
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        return false;
      }

      // Criar novo usuário
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        isAdmin
      };

      // Adicionar novo usuário à lista
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Criar objeto de usuário sem a senha
      const loggedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      };

      // Salvar usuário no estado e no localStorage
      setUser(loggedUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedUser));
      return true;
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      return false;
    }
  };

  // Função de logout
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Função de recuperação de senha
  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      // Obter usuários do localStorage
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Encontrar usuário com o email correspondente
      const foundUser = users.find((u: any) => u.email === email);
      if (foundUser) {
        // Em uma aplicação real, enviaria um email com a senha ou um link para redefinir
        // Para esta demonstração, apenas retornamos true
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      return false;
    }
  };

  // Valor do contexto
  const value = {
    user,
    login,
    signup,
    logout,
    forgotPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
