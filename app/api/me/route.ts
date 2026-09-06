import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
 try {
    const session = await pool.query("SELECT * FROM airbnb.sessions WHERE (session_token) = $1", [sessionToken]);
    if (session.rowCount === 0) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    if (session.rows[0].expires_at < new Date()) {
        return NextResponse.json({ error: "Sessão expirada" }, { status: 401 });
      }
    const user = await pool.query("SELECT * FROM airbnb.users WHERE id = $1", [session.rows[0].user_id]);
    if (user.rowCount === 0 ) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar o usuário" }, { status: 500 });
    }
  // próximo passo: buscar no banco qual usuário corresponde a esse token
}