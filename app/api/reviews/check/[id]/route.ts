import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const { id: property_id } = await params;

  try {
    // busca as reviews de cada usuário na propriedade selecionada, ordenando por data de criação.
    const reviews = await pool.query(
      `SELECT * FROM airbnb.reviews r JOIN airbnb.users u ON u.id = r.user_id WHERE r.property_id = $1 ORDER BY r.created_at DESC`,
      [property_id],
    );
    return NextResponse.json({ reviews: reviews.rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro Interno" }, { status: 500 });
  }
}
