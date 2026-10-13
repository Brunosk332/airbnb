import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // declara a variável propertyId com o valor do parâmetro id
    const {id} = await params;
    console.log("id da propriedade",id);
    // transforma o valor do parâmetro id em um número
    const propertyId = Number(id);
    console.log("id da propriedade transformada em número",propertyId);
    // verifica se o id é um número válido
    if (!Number.isInteger(propertyId) || propertyId <= 0) {
      return NextResponse.json(
        { error: "id de propriedade inválido" },
        { status: 400 },
      );
    }
    const result = await pool.query(
      "SELECT check_in, check_out FROM airbnb.bookings WHERE property_id = $1 AND status = 'confirmed' AND check_out >= CURRENT_DATE",
      [propertyId],
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
