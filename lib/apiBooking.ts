
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

function toAPIDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export async function bookings(
  property_id: number,
  checkIn: Date,
  checkOut: Date,
  paymentMethod: "pix" | "card",
  guests: number,
  
) {
  try {
    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        property_id,
        check_in: toAPIDate(checkIn),
        check_out: toAPIDate(checkOut),
        paymentMethod,
        guests,
      }),
    });

    if (!res.ok) return { success: false };

    const data = await res.json();
    return { success: true, ...data };
  } catch {
    return { success: false };
  }
}