import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  // BOTAR OS STATUS CODES
  if (!sessionToken) {
    return NextResponse.json(
      { error: "Nenhum usuário autenticado" },
      { status: 401 },
    );
  }
  const {
    type,
    location,
    price_per_night,
    max_guests,
    bedrooms,
    bathrooms,
    allows_pets,
    has_wifi,
    has_parking,
    description,
  } = await request.json();

  if (
    !type?.trim() ||
    !location?.trim() ||
    !price_per_night ||
    price_per_night <= 0 ||
    !max_guests ||
    max_guests <= 0 ||
    !bedrooms ||
    bedrooms <= 0 ||
    !bathrooms ||
    bathrooms <= 0 ||
    !allows_pets?.trim() ||
    !has_wifi?.trim() ||
    !has_parking?.trim() ||
    !description?.trim()
  ) {
    return NextResponse.json(
      {
        error: "Preencha todos os campos obrigatórios",
      },
      { status: 400 },
    );
  }
  try {
    const verifyUser = await pool.query(
      `SELECT * FROM sessions WHERE session_token = $1`,
      [sessionToken],
    );
    if (verifyUser.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 401 },
      );
    }
    const verifyUserHost = await pool.query(
      `SELECT is_host FROM users WHERE id = $1`,
      [verifyUser.rows[0].user_id],
    );
    if (verifyUserHost.rows[0].is_host === false) {
      return NextResponse.json(
        { error: "Usuário não é anfitrião" },
        { status: 401 },
      );
    }
    const newProperty = await pool.query(
      `INSERT INTO properties (host_id,type, location, price_per_night, max_guests, bedrooms, bathrooms, allows_pets, has_wifi, has_parking, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`,
      [
        verifyUser.rows[0].user_id,
        type,
        location,
        price_per_night,
        max_guests,
        bedrooms,
        bathrooms,
        allows_pets,
        has_wifi,
        has_parking,
        description,
      ],
    );

    return NextResponse.json(newProperty.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Ocorreu um erro ao salvar a propriedade",
      },
      {
        status: 500,
      },
    );
  }
}
