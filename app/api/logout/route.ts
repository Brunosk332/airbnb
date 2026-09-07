import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
export async function POST(request: Request) {

const cookieStore = await cookies();
const sessionToken = cookieStore.get("sessionToken")?.value;
    try {
        const session = await pool.query("DELETE FROM airbnb.sessions WHERE (session_token) = $1", [sessionToken]);

        if (session.rowCount === 0) {
            return NextResponse.json({ error: "Sessão não encontrada" }, { status: 404 });
        }
        cookieStore.delete("sessionToken"); 
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar sessão" }, { status: 500 });
        }
  return NextResponse.json({ message: "Sessão deletada com sucesso" });
}