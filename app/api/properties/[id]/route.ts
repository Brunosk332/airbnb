import pool from "../../../../lib/db";
import { NextResponse } from "next/server";
// devolve a propriedade de acordo com o id dela
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    // seleciona a propriedade
    const propertyResult = await pool.query(
      "SELECT * FROM airbnb.properties WHERE id = $1",
      [id],
    );
    // se a propriedade não existir retorna erro
    if (propertyResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Propriedade não encontrada" },
        { status: 404 },
      );
    }
    // pega as imagens da propriedade
    const imagesResult = await pool.query(
      "SELECT url, category FROM airbnb.images WHERE property_id = $1",
      [id],
    );
    // devolve os dados da propriedade
    const property = {
      ...propertyResult.rows[0],
      images: imagesResult.rows.map((row) => row.url),
    };

    return NextResponse.json(property);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar propriedade" },
      { status: 500 },
    );
  }
}
