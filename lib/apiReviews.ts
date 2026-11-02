import { getSessionUser } from "./auth";
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
export async function Review(
  isEditing: boolean,
  propertyId: string,
  stars: number,
  review: string,
) {
  try {
    const res = await fetch(
      `${API_URL}${isEditing ? "/reviews/edit" : "/reviews"}`,
      {
        method: "POST",
        cache: "no-store",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, stars, review }),
      },
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err.error ?? err.message };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Erro de conexão" };
  }
}
export async function showReviews(property_id: number) {
  try {
    const res = await fetch(`${API_URL}/reviews/check/${property_id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return { success: false, reviews: [] };
    }
    const data = await res.json();
    return { success: true, reviews: data.reviews };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao buscar avaliações" };
  }
}
export async function userReviews() {
  try {
    const res = await fetch(`${API_URL}/reviews/userReviews`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return { success: false, reviews: [] };
    }
    const data = await res.json();
    return { success: true, reviews: data.reviews };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Você ainda não possui nenhuma avaliação",
    };
  }
}
