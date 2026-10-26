import { NextResponse } from "next/server";
import { getSessionUser } from "../../../../../lib/auth";
import pool from "@/lib/db";
export async function GET(request: Request, { params }: {params: Promise<{ id: string }>}) {
  //  pega o id do usuario e verifica se ele está logado
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { error: "Precisa estar logado em uma conta para comentar" },
      { status: 401 },
    );
  }
  const { id: propertyId } = await params;
  try {
    // verifica se o usuário ja reservou a propriedade alguma vez
    const booking = await pool.query(
      `SELECT id FROM airbnb.bookings WHERE property_id = $1 AND guest_id = $2 AND check_out <= CURRENT_DATE`,
      [propertyId, user.user_id],
    );
    if (booking.rows.length === 0) {
      return NextResponse.json(
        {
          error:
            "Você não pode comentar porque ainda não reservou a propriedade",
        },
        { status: 403 },
      );
    }
    // verifica se o usuário já comentou na propriedade
    const existingReview = await pool.query(
      `SELECT comment FROM airbnb.reviews WHERE property_id = $1 AND user_id = $2`,
      [propertyId, user.user_id],
    );
    if (existingReview.rows.length > 0) {
      return NextResponse.json(
        { error: "Você já comentou esta propriedade" },
        { status: 409 },
      );
    } 
    return NextResponse.json(true);
} catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao avaliar a propriedade" },
      { status: 500 },
    );
  }
}


