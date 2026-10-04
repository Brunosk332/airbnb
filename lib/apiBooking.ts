const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function bookings(
  propertyId: number,
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
        propertyId,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        paymentMethod,
      }),
    });

    if (!res.ok) return { success: false };

    const data = await res.json();
    return { success: true, ...data };
  } catch {
    return { success: false };
  }
}