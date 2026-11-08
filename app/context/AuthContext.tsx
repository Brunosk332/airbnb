"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

//types
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
  // Usuário logado ou null se não houver sessão. 
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  newProperty: (formData: FormData) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const NETWORK_ERROR = "Erro de conexão. Tente novamente.";

// Converte o formato da API 'is_host' para o formato do front 'isHost'.
function toUser(data: { name: string; email: string; is_host: boolean }): User {
  return { name: data.name, email: data.email, isHost: data.is_host };
}

// Pagina de autenticação.
// Guarda o usuário logado, cuida do login, cadastro, logout e criação de propriedade.
// Refatoração para o futuro: mover a criação de propriedades para uma lib
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Ao carregar o site, verifica se já existe sessão ativa
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me");
        setUser(res.ok ? toUser(await res.json()) : null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Cria uma nova propriedade, e envia o formulário com as imagens.
  async function newProperty(formData: FormData): Promise<AuthResult> {
    try {
      const res = await fetch("/api/newProperty", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { success: false, message: data.error ?? "Erro ao criar propriedade" };
      }
      return { success: true };
    } catch {
      return { success: false, message: NETWORK_ERROR };
    }
  }

  // Cadastra um novo usuário e já o deixa logado.
  async function register(name: string, email: string, password: string): Promise<AuthResult> {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { success: false, message: data.error ?? "Erro ao cadastrar" };
      }
      setUser(toUser(data));
      return { success: true };
    } catch {
      return { success: false, message: NETWORK_ERROR };
    }
  }

  // Entra na conta do usuário.
  async function login(email: string, password: string): Promise<AuthResult> {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 400 || res.status === 401) {
        return { success: false, message: "E-mail ou senha incorretos" };
      }
      if (!res.ok) {
        return { success: false, message: "Erro no servidor. Tente novamente." };
      }
      setUser(toUser(await res.json()));
      return { success: true };
    } catch {
      return { success: false, message: NETWORK_ERROR };
    }
  }

  // Encerra a sessão e limpa o usuário, menu atualiza sem recarregar a página
  async function logout(): Promise<AuthResult> {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (!res.ok) {
        return { success: false, message: "Não foi possível sair." };
      }
      setUser(null);
      return { success: true };
    } catch {
      return { success: false, message: NETWORK_ERROR };
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, newProperty }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para acessar a autenticação. Só funciona dentro do AuthProvider.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth precisa estar dentro de um AuthProvider");
  return context;
}