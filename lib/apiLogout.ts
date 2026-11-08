const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export default async function handleLogout() {
    try {
    const res = await fetch(`${API_URL}/logout`, {
        method: "POST"
    }
    )

    if (!res.ok) {
        console.error("Erro ao sair da conta");
        return false;
      }
  
      return true;
    } catch (error) {
      console.error("Erro de conexão ao sair:", error);
      return false;
    }

}// terminar o logout