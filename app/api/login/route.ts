// app/api/login/route.ts
import pool from "../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const result = await pool.query("SELECT * FROM airbnb.users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const user = result.rows[0];
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    return NextResponse.json({ id: user.id, name: user.name, email: user.email, is_host: user.is_host });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}