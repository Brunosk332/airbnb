// fazer parte paara mostrar os comentarios;
import { useParams } from "next/navigation";
import { showReviews } from "@/lib/apiReviews";
import { useState, useEffect } from "react";

type Review = {
  id: number;
  rating: number | string;
  comment: string | null;
  updated_at: string;
  name: string;
  //    photo_url: string | null;
};

export default function ReviewsBody() {
  const [status, setStatus] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const property = useParams<{ id: string }>();
  const propertyId = property.id;
  useEffect(() => {
    async function getReviews() {
      const { success, reviews } = await showReviews(Number(propertyId));

      if (!success) {
        setStatus(false);
        setLoading(false);
        return;
      }
      setReviews(reviews);
      setLoading(false);
    }
    getReviews();
  }, [propertyId]);
  const sorted = [...reviews].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );

  if (sorted.length === 0) {
    return <p className="text-neutral-500">Nenhuma avaliação ainda.</p>;
  }

  return (
    <div className="mt-10 mb-50 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sorted.map((r) => (
        <article key={r.id} className="flex flex-col gap-3">
          <header className="flex items-center gap-3">
          {/*{r.photo_url ? (
              <img
                src={r.photo_url}
                alt={r.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-neutral-200" />
            )}
            */}
            <div>
              <p className="font-semibold text-neutral-900">{r.name}</p>
              <time className="text-sm text-neutral-500" dateTime={r.updated_at}>
                {new Date(r.updated_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
          </header>

          <div aria-label={`${Number(r.rating)} de 5 estrelas`} className="text-xl leading-none">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={n <= Number(r.rating) ? "text-neutral-900" : "text-neutral-300"}>
                ★
              </span>
            ))}
          </div>

          {r.comment && <p className="text-neutral-800">{r.comment}</p>}
        </article>
      ))}
    </div>
  );
}