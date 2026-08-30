
import pool from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const propertyResult = await pool.query("SELECT * FROM airbnb.properties WHERE id = $1", [id]);

    if (propertyResult.rows.length === 0) {
      return NextResponse.json({ error: "Propriedade não encontrada" }, { status: 404 });
    }

    const imagesResult = await pool.query("SELECT url, category FROM airbnb.images WHERE property_id = $1", [id]);

    const property = {
      ...propertyResult.rows[0],
      images: imagesResult.rows.map((row) => row.url),
    };

    return NextResponse.json(property);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar propriedade" }, { status: 500 });
  }
}