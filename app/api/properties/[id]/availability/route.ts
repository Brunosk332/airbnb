import pool from "@/lib/db"
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: { id: string}}) {
    try {
        const propertyId = params.id;

        const result = await pool.query("SELECT check_in, check_out, total_price FROM airbnb.bookings WHERE property_id = $1 AND status = 'confirmed' AND check_out >= NOW()", [propertyId]);

        return NextResponse.json(result.rows);
     } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
     }
}