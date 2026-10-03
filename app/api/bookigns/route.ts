import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { DatabaseError } from "pg";
export async function POST(request: Request) {
  // cria uma variável com a data atual em UTC
  const CurrentDate = new Date();
  CurrentDate.setUTCHours(0, 0, 0, 0);
  try {
    // verifica se o usuarioi  está logado
    const userId = await getSessionUser();
    if (!userId) {
      return NextResponse.json(
        { error: "Precisa estar logado em uma conta" },
        { status: 401 },
      );
    }
    // pega os dados do corpo da requisição
    const { property_id, check_in, check_out, paymentMethod, guests } =
      await request.json();
    //transforma a const guest  em um numero
    const guestsNumber = Number(guests);
    // verifica se os campos obrigatórios não estão vazios
    if (!property_id || !check_in || !check_out || !paymentMethod || !guests) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 },
      );
    }

    // esta api não tem pagamento implementado então não é necessário preencher os dados de pix ou cartao com algo real
    // verifica se a propriedade existe no banco de dados puxando o id do host e o preço por noite da propriedade
    const verifyProperty = await pool.query(
      "SELECT host_id, price_per_night FROM airbnb.properties WHERE id = $1",
      [property_id],
    );
    if (verifyProperty.rows.length === 0) {
      return NextResponse.json(
        { error: "Propriedade não encontrada" },
        { status: 400 },
      );
    }

    // garante que o host da propriedade não possa reservar sua propriedade
    if (verifyProperty.rows[0].host_id === userId) {
      return NextResponse.json(
        { error: "Você não pode reservar esta propriedade" },
        { status: 400 },
      );
    }

    // cria uma regex para validar se a data esta em tal formato
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(check_in) || !dateRegex.test(check_out)) {
      return NextResponse.json(
        { error: "Data está no formato errado" },
        { status: 400 },
      );
    }
    //função de validar data, verifica se a data não está fora do padrão, ex: 2026-02-31
    function isValidDate(dateString: string) {
      const [year, month, day] = dateString.split("-").map(Number);

      //transforma o timestamp em um objeto date em UTC
      const date = new Date(Date.UTC(year, month - 1, day));
      // verifica se a data gerada a partir do timestamp é igual a data passada pelo usuário, bloqueia datas que não existem
      return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
      );
    }
    // chama a função de validar data no checkin e chemckout
    if (!isValidDate(check_in) || !isValidDate(check_out)) {
      return NextResponse.json({ error: "Data inválida" }, { status: 400 });
    }
    // transforma a data em um objeto date em UTC formato timestamp
    const checkIn = new Date(`${check_in}T00:00:00Z`);
    const checkOut = new Date(`${check_out}T00:00:00Z`);
    // se checkin for maior ou igual a checkout retorna erro
    if (checkIn >= checkOut) {
      return NextResponse.json(
        { error: "Data de check-out deve ser depois do check-in" },
        { status: 400 },
      );
    }
    // se checkin for menor que a data atual retorna erro
    if (checkIn < CurrentDate) {
      return NextResponse.json(
        { error: "Data de check-in não pode ser no passado" },
        { status: 400 },
      );
    }
    // cria um objeto date com a data do dia seguinte para garantiur que o usuario tenha reservado com pelo menos 1 dia de antecedência
    const NextDay = new Date(CurrentDate);
    NextDay.setUTCDate(NextDay.getUTCDate() + 1);
    if (checkIn < NextDay) {
      return NextResponse.json(
        { error: "Você precisa reservar com pelo menos 1 dia de antecedência" },
        { status: 400 },
      );
    }

    // verifica se a propriedade está disponível para reservar no dia informado
    const verifyIfBookingExists = await pool.query(
      "SELECT id FROM airbnb.bookings WHERE property_id = $1 AND check_in < $3 AND check_out > $2",
      [property_id, checkIn, checkOut],
    );
    if (verifyIfBookingExists.rows.length > 0) {
      return NextResponse.json(
        { error: "Já existe uma reserva para esta data" },
        { status: 409 },
      );
    }

    // verifica o preço por noite da propriedade no banco de dados
    const pricePerNight = Number(verifyProperty.rows[0].price_per_night);
    // converte a data para dias
    const nights = 
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
    let total_price = 0;
    // calcula o total do preço com taxa do cartao e do pix, se não for pix ou card retorna erro
    if (paymentMethod === "pix") {
      total_price = pricePerNight * nights;
    } else if (paymentMethod === "card") {
      total_price = pricePerNight * nights * 1.108;
    } else {
      return NextResponse.json(
        { error: "Método de pagamento inválido" },
        { status: 400 },
      );
    }
    // verifica se o preço não é negativo
    if (!Number.isFinite(total_price) || total_price < 0) {
      return NextResponse.json({ error: "Preço inválido" }, { status: 400 });
    }
    // verifica se o número de hóspedes é um número inteiro entre 1 e 4
    if (
      !Number.isInteger(guestsNumber) ||
      guestsNumber < 1 ||
      guestsNumber > 4
    ) {
      return NextResponse.json(
        { error: "Número de hóspedes inválido" },
        { status: 400 },
      );
    }
    //  Insert do booking
    const CreateBooking = await pool.query(
      "INSERT INTO airbnb.bookings (property_id, check_in, check_out, total_price, guests, user_id, payment_method, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        property_id,
        check_in,
        check_out,
        total_price,
        guestsNumber,
        userId,
        paymentMethod,
        "confirmed",
      ],
    );

    return NextResponse.json(CreateBooking.rows[0], { status: 201 });
  } catch (error) {
    if (error  instanceof DatabaseError && error.code === "23P01") {
      return NextResponse.json(
        { error: "Já existe uma reserva para esta data" },
        { status: 409 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao reservar acomodação" },
      { status: 500 },
    );
  }
}