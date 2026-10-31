const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

interface Review {
  property_id: number;
  comment: string | null;
  stars: number;
}
export async function getReviews(property_id: number) {
  try {
    const res = await fetch(`${API_URL}/reviews/verify/${property_id}`, {
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  } catch {
    return { status: 500, data: {} };
  }
}
