import Image from "next/image";
import { useState, useEffect } from "react";
import { userReviews } from "@/lib/apiReviews"
import Link from "next/link";
//  types
interface Review {
  id: number;
  type: string;
  location: string;
  url: string;
  property_id: number;
  rating: number;
  comment: string;
  updated_at: number;
}
// page
export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
//  fetch que retorna as avaliações atuais
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await userReviews()
        console.log("res res res res res res res res", res)
        setReviews(res.reviews)
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);
  // se estiver carregando exibe o loading
  if (loading) {
    return <div>Carregando...</div>;
  }
  // se não tiver avaliações, exibe que não foram feito avaliações ainda
  if (reviews.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-8">Avaliações</h2>
        <div className="flex flex-col items-center text-center max-w-sm mx-auto mt-12">
          <div className="relative w-48 h-48 mb-6">
            <Image
              src="https://picsum.photos/300/300?random=50"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-xl font-bold mb-2">Você não possui nenhuma avaliação</h3>
          <p className="text-neutral-600 mb-6">
            Depois de avaliar uma viagem, experiência ou serviço, volte aqui
            para conferir os detalhes.
          </p>
          <Link href={`/`}>
          <button
            className="bg-pink-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-pink-700 
transition-colors"
          >
            Comece já
          </button>
          </Link>
        </div>
      </div>
    );
  }
  // se tiver avaliações, exibe as avaliações
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="mb-6 text-2xl font-semibold">Avaliações</h1>
  
      {reviews.length === 0 ? (
        <p className="py-10 text-center text-neutral-500">
          Você ainda não possui avaliações.
        </p>
      ) : (
        reviews.map((review: Review) => (
          <div
            key={review.id}
            className="mb-4 grid grid-cols-[128px_1fr_1fr_auto] items-start gap-6 rounded-xl border border-neutral-200 p-4 pr-5"
          >
            {/* Imagem de capa */}
            {review.url && (
              <Link href={`/property/${review.property_id}`}>
              <Image
                src={review.url}
                alt="Imagem de capa do imóvel"
                width={128}
                height={128}
                className="aspect-square shrink-0 rounded-xl object-cover"
              />
              </Link>
            )}
  
            {/* Tipo, localização e estrelas */}
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">{review.type}</p>
              <p className="text-neutral-600">{review.location}</p>
              <p className="text-neutral-600">{review.rating} estrelas</p>
            </div>
  
            {/* Comentário e data */}
            <div className="flex flex-col gap-1">
              <p className="text-neutral-600">
                Comentário: {review.comment || "Sem comentário"}
              </p>
              <p className="text-neutral-600">
                Data: {new Date(review.updated_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
  
            {/* ID do imóvel */}
            <div className="flex flex-col h-full gap-1">
              <p className="text-neutral-600">ID: {review.property_id}</p>
              <Link href={`/property/${review.property_id}`}>
              <button className="bg-pink-600 text-white rounded-lg px-6 py-3  mt-auto font-semibold hover:bg-pink-700 
transition-colors">
          Editar
        </button>
        </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}