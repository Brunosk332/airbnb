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
  avatar_url: string | null;
};

export default function ReviewsBody() {
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(12);
  const property = useParams<{ id: string }>();
  const propertyId = property.id;
  const total = reviews.length;
  const average = reviews.reduce((sum, r) => sum + Number(r.rating), 0) / total;
  const distribution = [5, 4, 3, 2, 1].map((n) => ({
    n,
    count: reviews.filter((r) => Number(r.rating) === n).length,
  }));
  useEffect(() => {
    async function getReviews() {
      const { success, reviews } = await showReviews(Number(propertyId));

      if (!success) {
        setLoading(false);
        setError(true);
        return;
      }
      setReviews(reviews);
      setLoading(false);
    }
    getReviews();
  }, [propertyId]);
  const sorted = [...reviews].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
  if (error) {
    return (
      <p className="text-neutral-500">Erro ao carregar. Tente novamente.</p>
    );
  }
  if (loading) {
    return <p className="text-neutral-500">Carregando...</p>;
  }

  if (sorted.length === 0) {
    return <p className="text-neutral-500">Nenhuma avaliação ainda.</p>;
  }

  return (
    <div className="mb-50">
      <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex flex-col items-center md:min-w-40">
          <p className="text-5xl font-bold text-neutral-900">
            {average.toFixed(1)}
          </p>
          <div className="text-xl leading-none">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={
                  n <= Math.round(average)
                    ? "text-neutral-900"
                    : "text-neutral-300"
                }
              >
                ★
              </span>
            ))}
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            {total} {total === 1 ? "avaliação" : "avaliações"}
          </p>
        </div>

        <div className="flex w-full max-w-md flex-col gap-2">
          {distribution.map(({ n, count }) => (
            <div key={n} className="flex items-center gap-3 text-sm">
              <span className="w-8 text-neutral-700">{n} ★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-neutral-900"
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </div>
              <span className="w-6 text-right text-neutral-500">{count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sorted.slice(0, visible).map((r) => (
          <article key={r.id} className="flex flex-col gap-3">
            <header className="flex items-center gap-3">
              {r.avatar_url ? (
                <img
                  src={r.avatar_url}
                  alt={r.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="grid h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
                  <p className="font-semibold text-neutral-700 text-1xl">
                    {r.name?.charAt(0).toUpperCase()}
                  </p>
                </div>
              )}
              <div>
                <p className="font-semibold text-neutral-900">{r.name}</p>
                <time
                  className="text-sm text-neutral-500"
                  dateTime={r.updated_at}
                >
                  {new Date(r.updated_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
            </header>

            <div
              aria-label={`${Number(r.rating)} de 5 estrelas`}
              className="text-xl leading-none"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={
                    n <= Number(r.rating)
                      ? "text-neutral-900"
                      : "text-neutral-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>

            {r.comment && <p className="text-neutral-800">{r.comment}</p>}
          </article>
        ))}
      </div>

      {sorted.length > visible && (
        <button
          type="button"
          onClick={() => setVisible((v) => v + 12)}
          className="mt-8 rounded-lg border border-neutral-900 px-6 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-100"
        >
          Ver mais
        </button>
      )}
    </div>
  );
}
