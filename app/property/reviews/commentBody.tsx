"use client";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useParams } from "next/navigation";
import { Review } from "@/lib/apiReviews";

type Props = {
  existingReview?: {
    stars?: number;
    comment?: string;
  };
};
export default function CommentBody({ existingReview }: Props) {
  const isEditing = !!existingReview;
  console.log(existingReview);
  const starsArray = [5, 4, 3, 2, 1];
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState(existingReview?.stars ?? 0);
  const [review, setReview] = useState(existingReview?.comment ?? "");
  const [error, setError] = useState("");
  const property = useParams<{ id: string }>();
  const propertyId = property.id;

  async function reviewHandler(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await Review(isEditing, propertyId, stars, review)

    setLoading(false);

    if (!res.success) {
      setError(res.message ?? "Erro ao enviar");
      return;
    }
  }

  if (loading) return <div>Carregando...</div>;
  return (
    <div>
      <form
        onSubmit={reviewHandler}
        className="mt-4 flex flex-col gap-5 rounded-2xl bg-neutral-100 p-6"
      >
        <fieldset>
          <span className="mb-2 font-semibold text-neutral-900">
            O que você achou?
          </span>

          {/* DOM em ordem 5→1 + flex-row-reverse: a seleção pinta a estrela e todas as anteriores */}
          <div
            className="
              flex flex-row-reverse justify-end gap-1
              [&>input:checked~label]:text-neutral-900
              [&>label:hover]:text-neutral-900
              [&>label:hover~label]:text-neutral-900
              [&>input:focus-visible+label]:rounded
              [&>input:focus-visible+label]:outline-2
              [&>input:focus-visible+label]:outline-neutral-900
            "
          >
            {starsArray.map((n) => (
              <Fragment key={n}>
                <input
                  className="sr-only"
                  type="radio"
                  id={`star-${n}`}
                  name="stars"
                  value={n}
                  required
                  checked={stars === n}
                  onChange={(e) => setStars(Number(e.target.value))}
                />
                <label
                  htmlFor={`star-${n}`}
                  aria-label={`${n} ${n === 1 ? "estrela" : "estrelas"}`}
                  className="cursor-pointer text-4xl leading-none text-neutral-300 transition-colors"
                >
                  ★
                </label>
              </Fragment>
            ))}
          </div>
          <p>Nota selecionada: {stars}</p>
        </fieldset>
        <div className="flex flex-col gap-2">
          <label htmlFor="review" className="font-semibold text-neutral-900">
            Comentar
          </label>
          <textarea
            id="review"
            name="review"
            rows={4}
            minLength={5}
            maxLength={400}
            onChange={(e) => setReview(e.target.value)}
            value={review}
            placeholder="Conte como foi sua estadia..."
            className="w-full resize-none rounded-xl border border-neutral-300 bg-white p-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
        {error && (
          <span className="block w-full text-center mt-3 text-sm text-red-500">
            {error}
          </span>
        )}
        <button
          type="submit"
          className="self-end rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-3 font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        >
          Enviar
        </button>
      </form>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  );
}
