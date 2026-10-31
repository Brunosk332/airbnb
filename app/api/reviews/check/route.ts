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
    const reviews = await pool.query(
      `SELECT * FROM airbnb.reviews r JOIN airbnb.users u ON u.id = r.user_id WHERE property_id = $1 ORDER BY created_at DESC`,
      [property_id],
    );
    if (reviews.rows[0] === 0)
      return NextResponse.json(
        { error: "Não foi possível encontrar nenhuma avaliação" },
        { status: 204 },
      );
    return NextResponse.json({ reviews: reviews.rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro Interno" }, { status: 500 });
  }
}
