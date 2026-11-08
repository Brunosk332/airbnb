import { NextResponse } from "next/server";
import { getSessionUser } from "../../../../lib/auth";
import pool from "@/lib/db";
export async function POST(request: Request) {
  //  pega o id do usuario e verifica se ele está logado
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { error: "Precisa estar logado em uma conta para comentar" },
      { status: 401 },
    );
  }
  // pega os dados do corpo da requisição
  const { review, propertyId, stars } = await request.json();
  // verifica se todos os campos estão preenchidos
  if (!propertyId || !stars) {
    return NextResponse.json(
      { error: "Preencha todos os campos" },
      { status: 400 },
    );
  }
  
  // verifica se as estrelas estão certas
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return NextResponse.json(
      { error: "Por favor, selecione um valor entre 1 e 5" },
      { status: 400 },
    );
  }
  // cria variável opcional para o comentário
  let optionalReview = "";

  // verifica se o comentário é uma string, se não for uma string, undefined ou null retorna erro
  if (review !== null && review !== undefined) {
    if (typeof review !== "string") {
      return NextResponse.json(
        { error: "O comentário deve ser um texto" },
        { status: 400 },
      );
    }
    // apaga os espaços em branco do comentário
    optionalReview = review.trim();
  } 

  // verifica se o comentário, caso exista, está entre 5 e 400 caracteres
  if (
    optionalReview.length > 0 &&
    (optionalReview.length < 5 || optionalReview.length > 400)
  ) {
    return NextResponse.json(
      { error: "O comentário deve ter entre 5 e 400 caracteres" },
      { status: 400 },
    );
  }

  try {
    // verifica se o usuário ja reservou a propriedade alguma vez

    const booking = await pool.query(
      `SELECT id FROM airbnb.bookings WHERE property_id = $1 AND guest_id = $2 AND check_in <= CURRENT_DATE`,
      [propertyId, user.user_id],
    );
    if (booking.rows.length === 0) {
      return NextResponse.json(
        {
          error:
            "Você não pode comentar porque ainda não reservou a propriedade",
        },
        { status: 403 },
      );
    }
    // verifica se o comentário existente é igual
    const existingReview = await pool.query(
      `SELECT comment FROM airbnb.reviews WHERE property_id = $1 AND user_id = $2`,
      [propertyId, user.user_id],
    );
    if (existingReview.rows.length > 0 ) {
      const current = existingReview.rows[0]
      if (current.comment === review && current.rating === stars) {
      return NextResponse.json(
        { error: "Você precisa editar algo antes de enviar" },
        { status: 409 },
      
      );
    }
    }
    // edita o comentário na tabela de comentários
    const newReview = await pool.query(
      `UPDATE airbnb.reviews SET comment = $1, rating = $2, updated_at = CURRENT_TIMESTAMP
       WHERE property_id = $3 AND user_id = $4
        RETURNING *`,
      [optionalReview, stars, propertyId, user.user_id],
    );

    return NextResponse.json(newReview.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao avaliar a propriedade" },
      { status: 500 },
    );
  }
}
////  apagar a tabela do db, booking id
