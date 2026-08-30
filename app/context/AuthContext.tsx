"use client";
import { createContext, useContext, useState, ReactNode } from "react";
interface User {
  name: string;
  email: string;
  isHost: boolean;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//const FAKE_USER = {
//    name: "Bruno",
//    email: "bruno@gmail.com",
//    password: "123456",
//    isHost: true,
//};
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function register(
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) return false;

    const userData = await res.json();
    setUser({
      name: userData.name,
      email: userData.email,
      isHost: userData.is_host,
    });
    return true;
  }

  async function login(email: string, password: string): Promise<boolean> {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return false;
    }
    const userData = await res.json();
    setUser({
      name: userData.name,
      email: userData.email,
      isHost: userData.is_host,
    });
    return true;
  }

  function logout() {
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
