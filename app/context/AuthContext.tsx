"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
interface User {
  name: string;
  email: string;
  isHost: boolean;
}
type AuthResult = {
  success: boolean;
  message?: string;
};
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthResult>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  //verifica se o usuário está logado
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUser({
          name: data.name,
          email: data.email,
          isHost: data.is_host,
        });
      } else {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  // cria uma conta para o usuario
  async function register(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResult> {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.error };
    }

    setUser({
      name: data.name,
      email: data.email,
      isHost: data.is_host,
    });
    return { success: true };
  }
  // entra na conta do usuario
  async function login(email: string, password: string): Promise<AuthResult> {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { success: false, message: "E-mail ou senha incorretos" };
    }
    const userData = await res.json();
    setUser({
      name: userData.name,
      email: userData.email,
      isHost: userData.is_host,
    });
    return { success: true };
  }
  // sai da conta do usuario
  async function logout() {
      const res = await fetch("/api/logout", {
 method: "POST",
      })
      if (!res.ok) {
        console.error("Erro ao deletar sessão");
      }  
      setUser(null);
    }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth precisa estar dentro de um AuthProvider");
  return context;
}
