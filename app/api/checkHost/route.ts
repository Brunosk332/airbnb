import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) {
    return NextResponse.json({ isHost: false }, { status: 401 });
  }
  try {
    const verifyUser = await pool.query(
      "SELECT * FROM airbnb.sessions WHERE session_token = $1",
      [sessionToken],
    );

    if (verifyUser.rows.length === 0) {
      return NextResponse.json({ isHost: false }, { status: 401 });
    }

    const verifyHost = await pool.query(
      "SELECT (is_host) FROM airbnb.users WHERE id = $1",
      [verifyUser.rows[0].user_id],
    );
 console.log("valor",verifyHost.rows[0].is_host, typeof verifyHost.rows[0].is_host);
    if (!verifyHost.rows[0].is_host === true) {
      return NextResponse.json({ isHost: false }, { status: 401 });
    }

    return NextResponse.json({ isHost: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { isHost: false },
      {
        status: 500,
      }, 
    );
  }
}
