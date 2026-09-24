import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
export async function POST(request: Request) {
    
    try {
        const userId = await getSessionUser();
        if (!userId) {
            return NextResponse.json({ error: "Precisa estar logado em uma conta" }, { status: 401 });
        }
    const { property_id, chech_in, check_out } = await request.json();
    
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Erro ao reservar acomodação"}, { status: 500})
        }

}