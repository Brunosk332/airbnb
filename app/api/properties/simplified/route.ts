import pool from "@/lib/db";
import { NextResponse } from "next/server";
// busca as propriedades para exibir em miniatura
export async function GET() {
  try {
    const propertyDetails = await pool.query(
      `SELECT p.id, p.type, p.location, p.price_per_night, i.url, COALESCE(AVG(r.rating), 0 ) AS rating, COUNT(r.id) AS total_reviews FROM airbnb.properties p JOIN airbnb.images i ON i.property_id = p.id AND category = 'cover' LEFT JOIN airbnb.reviews r ON r.property_id = p.id GROUP BY p.id, i.url`,
    );
    // se não tiver propriedades
    if (propertyDetails.rows.length === 0) {
      return NextResponse.json(
        { error: "não existem propriedades ainda" },
        { status: 400 },
      );
    }

    return NextResponse.json(propertyDetails.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar propriedade" },
      { status: 500 },
    );
  }
}
