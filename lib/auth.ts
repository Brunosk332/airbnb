import { cookies } from "next/headers";
import pool from "./db";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) {
    return null;
  }

  const result = await pool.query(
    "SELECT * FROM airbnb.sessions WHERE session_token = $1 AND expires_at > NOW()",
    [sessionToken],
  );
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0];
}
