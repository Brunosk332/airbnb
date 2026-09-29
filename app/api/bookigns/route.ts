import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
export async function POST(request: Request) {
  const CurrentDate = new Date();
  CurrentDate.setUTCHours(0, 0, 0, 0);
  try {
    const userId = await getSessionUser();
    if (!userId) {
      return NextResponse.json(
        { error: "Precisa estar logado em uma conta" },
        { status: 401 },
      );
    }
    const { property_id, check_in, check_out, paymentMethod, guests } =
      await request.json();

    const guestsNumber = Number(guests);

    if (!property_id || !check_in || !check_out || !paymentMethod || !guests) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 },
      );
    }

    // esta api não tem pagamento implementado então não é necessário preencher os dados de pix ou cartao com algo real
    const verifyProperty = await pool.query(
      "SELECT * FROM airbnb.properties WHERE id = $1",
      [property_id],
    );
    if (verifyProperty.rows.length === 0) {
      return NextResponse.json(
        { error: "Propriedade não encontrada" },
        { status: 400 },
      );
    }

    const checkIn = new Date(check_in);
    const checkOut = new Date(check_out);

    const checkInFormatted = checkIn.toISOString().split("T")[0];
    const checkOutFormatted = checkOut.toISOString().split("T")[0];

    if (checkIn >= checkOut) {
      return NextResponse.json(
        { error: "Data de check-out deve ser depois do check-in" },
        { status: 400 },
      );
    }
    if (checkIn < CurrentDate) {
      return NextResponse.json(
        { error: "Data de check-in não pode ser no passado" },
        { status: 400 },
      );
    }

    if (paymentMethod !== "pix" && paymentMethod !== "card") {
      return NextResponse.json(
        { error: "Método de pagamento invalido" },
        { status: 400 },
      );
    }
    // verifica o preço por noite da propriedade no banco de dados
    const pricePerNight = Number(verifyProperty.rows[0].price_per_night);
    // converte a data para dias
    const nights = Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
    let total_price = 0;
    // calcula o total do preço com taxa do cartao e do pix
    if (paymentMethod === "pix") {
      total_price = pricePerNight * nights;
    } else if (paymentMethod === "card") {
      total_price = pricePerNight * nights + pricePerNight * 0.108;
    }
    // verifica se o preço não é negativo
    if (total_price < 0) {
      return NextResponse.json({ error: "Preço inválido" }, { status: 400 });
    }

    if (
      guestsNumber !== 1 &&
      guestsNumber !== 2 &&
      guestsNumber !== 3 &&
      guestsNumber !== 4
    ) {
      return NextResponse.json(
        { error: "Número de hóspedes inválido" },
        { status: 400 },
      );
    }

    const verifyIfBookingExists = await pool.query(
      "SELECT id FROM airbnb.bookings WHERE property_id = $1 AND check_in < $3 AND check_out > $2",
      [property_id, checkInFormatted, checkOutFormatted],
    );
    if (verifyIfBookingExists.rows.length > 0) {
      return NextResponse.json(
        { error: "Já existe uma reserva para esta data" },
        { status: 409 },
      );
    }
    const CreateBooking = await pool.query(
      "INSERT INTO airbnb.bookings (property_id, check_in, check_out, total_price, guests, user_id, payment_method, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        property_id,
        checkInFormatted,
        checkOutFormatted,
        total_price,
        guestsNumber,
        userId,
        paymentMethod,
        "confirmed",
      ],
    );

    return NextResponse.json(CreateBooking.rows[0], { status: 201 });
  } catch (error: any) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    if (error.code === "23P01") {
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
