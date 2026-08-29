'use client'
import {createContext, useContext, useState, ReactNode} from 'react';
interface User {
    name: string;
    email: string;
    isHost: boolean;
}
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_USER = {
    name: "Bruno",
    email: "bruno@gmail.com",
    password: "123456",
    isHost: true,
};
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
  
    function login(email: string, password: string) {
      if (email === FAKE_USER.email && password === FAKE_USER.password) {
        setUser({ name: FAKE_USER.name, email: FAKE_USER.email, isHost: FAKE_USER.isHost });
        return true;
      }
      return false;
    }
  
    function logout() {
      setUser(null);
    }
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth precisa estar dentro de um AuthProvider");
    return context;
  }
