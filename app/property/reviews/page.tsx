'use client' 
import CommentBody from "./commentBody";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
export default function ReviewPage() {
    const [loading, setLoading] = useState(true);
    const [reviewStatus, setReviewStatus] = useState("");
    const [mode, setMode] = useState<"comment" | "edit">("comment");
    const [existingReview, setExistingReview] = useState<{ stars: number; comment: string } | undefined>();

    const property = useParams<{ id: string }>();
    const propertyId = property.id;
  
    useEffect(() => {
    async function commentAvailability() {
        setLoading(true);
      const res = await fetch(`/api/reviews/verify/${propertyId}`, {
        cache: "no-store",
      });
    // permite o usuario comentar
      if (res.status  === 200) {
        setReviewStatus("comment")
        setLoading(false);
        // permite o usuario editar seu comentario
      }else if (res.status === 409) {
            const data = await res.json()
            setExistingReview({ stars: Number(data.review.rating), comment: data.review.comment })
            setReviewStatus("comment")
            setMode("edit")
            setLoading(false);
            // nao permite o usuario editar nem comentar
        } else if (res.status === 403) {
            setReviewStatus("unavailable")
            setLoading(false);
            // erro no servidor/banco de dados 
            } else {
                setReviewStatus("error")
                setLoading(false);
            }// criar a page separada de editar comentario e de exibicao
        } 
       commentAvailability()
    }, [propertyId])

    if (loading) return <div>Carregando...</div>
    if (reviewStatus === "unavailable") return <div>Não é possível comentar porque ainda não reservou a propriedade</div>
    if (reviewStatus === "error") return <div>Erro ao carregar. Tente novamente.</div>
    if (reviewStatus === "comment" )return (
        <div>
            <CommentBody existingReview={existingReview} />
        </div>

    );
}