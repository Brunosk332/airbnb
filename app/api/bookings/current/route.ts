import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  // pega o token da sessão do usuário
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value
  try {
    // busca as propriedades que o usuário reservou e ainda não finalizou
    const result = await pool.query(
        `SELECT bookings.id,
                bookings.property_id,
                bookings.check_in::text  AS check_in,
                bookings.check_out::text AS check_out,
                bookings.total_price,
                bookings.guests,
                bookings.payment_method,
                bookings.guest_id,
                properties.type,
                properties.location,
                properties.rating,
                images.url AS cover
         FROM airbnb.bookings
         JOIN airbnb.sessions    ON sessions.user_id = bookings.guest_id
         JOIN airbnb.properties  ON properties.id = bookings.property_id
         LEFT JOIN airbnb.images ON images.property_id = properties.id
                                AND images.category = 'cover'
         WHERE sessions.session_token = $1
           AND bookings.status = 'confirmed'
           AND bookings.check_out >= CURRENT_DATE
         ORDER BY bookings.check_in DESC`,
        [sessionToken]
      );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}