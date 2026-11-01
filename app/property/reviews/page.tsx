"use client";
import CommentBody from "./commentBody";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getReviews } from "@/lib/apiReviews";
import ReviewsBody from "./reviewsBody";
export default function ReviewPage() {
  const [loading, setLoading] = useState(true);
  const [reviewStatus, setReviewStatus] = useState("");
  const [commentMenu, setCommentMenu] = useState(false);
  const [mode, setMode] = useState<"comment" | "edit">("comment");
  const [existingReview, setExistingReview] = useState<
    { stars: number; comment: string } | undefined
  >();

  const property = useParams<{ id: string }>();
  const propertyId = property.id;

  useEffect(() => {
    async function commentAvailability() {
      setLoading(true);
      const { status, data } = await getReviews(Number(propertyId));
      // permite o usuario comentar
      if (status === 200) {
        setReviewStatus("comment");
        setLoading(false);
        // permite o usuario editar seu comentario
      } else if (status === 409) {
        setExistingReview({
          stars: Number(data.review.rating),
          comment: data.review.comment,
        });
        setReviewStatus("edit");
        setMode("edit");
        setLoading(false);
        // nao permite o usuario editar nem comentar
      } else if (status === 403) {
        setReviewStatus("unavailable");
        setLoading(false);
        // erro no servidor/banco de dados
      } else {
        setReviewStatus("error");
        setLoading(false);
      } // criar a page separada de editar comentario e de exibicao
    }
    commentAvailability();
  }, [propertyId]);

  if (loading) return <div>Carregando...</div>;
  if (reviewStatus === "unavailable" || reviewStatus === "error")
    return (
      <div>
        {" "}
        <ReviewsBody />
      </div>
    );
  if (reviewStatus === "comment")
    return (
      <div>
        <button
          className="ml-4 mt-5 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-600"
          onClick={() => {
            if (!commentMenu) {
              setCommentMenu(true);
            } else {
              setCommentMenu(false);
            }
          }}
        >
          Comentar
        </button>
        {commentMenu && (
          <div>
            <CommentBody existingReview={existingReview} />
          </div>
        )}
        <ReviewsBody />
      </div>
    );
  if (reviewStatus === "edit")
    return (
      <div>
        <button
          className="ml-4 mt-5 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-600"
          onClick={() => {
            if (!commentMenu) {
              setCommentMenu(true);
            } else {
              setCommentMenu(false);
            }
          }}
        >
          Editar comentário
        </button>
        {commentMenu && (
          <div>
            <CommentBody existingReview={existingReview} />
          </div>
        )}
        <ReviewsBody />
      </div>
    );
}
