import pool from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT p.*, 
        (SELECT url FROM airbnb.images WHERE property_id = p.id AND category = 'cover' LIMIT 1) as cover_image
      FROM airbnb.properties p
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar propriedades" }, { status: 500 });
  }
}