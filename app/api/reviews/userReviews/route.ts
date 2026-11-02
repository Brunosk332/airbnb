import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        {
          error:
            "Você precisa estar logado em uma conta para ver as avaliações",
        },
        { status: 401 },
      );
    }
    const reviews = await pool.query(
      `SELECT
              r.*,
              p.type,
              p.location,
              i.image_url
            FROM airbnb.reviews r
            JOIN airbnb.properties p
              ON p.property_id = r.property_id
            JOIN airbnb.images i
              ON i.property_id = p.property_id
              AND i.category = 'cover'
            WHERE r.user_id = $1`,
      [user.user_id],
    );
    if (!reviews.rows.length) {
      return NextResponse.json(
        { message: "Você não tem nenhuma avaliação ainda" },
        { status: 200 },
      );
    }
    return NextResponse.json(reviews.rows, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar avaliações" },
      { status: 500 },
    );
  }
}
