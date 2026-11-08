import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
export async function POST(request: Request) {
// pega o cookie da sessão do usuário
const cookieStore = await cookies();
const sessionToken = cookieStore.get("sessionToken")?.value;
    try {
        // deleta o cookie da sessão
        const session = await pool.query("DELETE FROM airbnb.sessions WHERE session_token = $1", [sessionToken]);

        // apaga o cookie do navegador
        cookieStore.delete("sessionToken"); 

        return  NextResponse.json({messaage: "Sessão deletada com sucesso"})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar sessão" }, { status: 500 });
        }
}