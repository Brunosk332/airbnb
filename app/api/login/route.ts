// app/api/login/route.ts
import pool from "../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";

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

    const expireTime = 7 * 24 * 60 * 60 * 1000;
    const sessionToken = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + expireTime);

    await pool.query(
      "INSERT INTO airbnb.sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)",
      [user.id, sessionToken, expiresAt]
    );

    const cookieStore = await cookies();
    cookieStore.set("sessionToken", sessionToken, {
      httpOnly: true,
      expires: expiresAt,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ id: user.id, name: user.name, email: user.email, is_host: user.is_host });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}