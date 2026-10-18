import Image from "next/image";
import { useState, useEffect } from "react";
//  types
interface Booking {
  id: number;
  type: string;
  location: string;
  rating: number;
  cover: string;
  property_id: number;
  check_in: string;
  check_out: string;
  total_price: number;
  guests: number;
  payment_method: string;
  guest_id: number;
}
// page
export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
//  fetch que retorna as viagens atuais
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("http://localhost:3000/api/bookings/current");
        if (!res.ok) return;
        setBookings(await res.json());
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);
  // se estiver carregando exibe o loading
  if (loading) {
    return <div>Carregando...</div>;
  }
  // se não tiver reservas, exibe que não foram feito reservas ainda
  if (bookings.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-8">Viagens</h2>
        <div className="flex flex-col items-center text-center max-w-sm mx-auto mt-12">
          <div className="relative w-48 h-48 mb-6">
            <Image
              src="https://picsum.photos/300/300?random=50"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-xl font-bold mb-2">Planeje sua próxima viagem</h3>
          <p className="text-neutral-600 mb-6">
            Depois de reservar uma viagem, experiência ou serviço, volte aqui
            para conferir os detalhes, explorar o mapa e marcar lugares para
            visitar.
          </p>
          <button
            className="bg-pink-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-pink-700 
transition-colors"
          >
            Comece já
          </button>
        </div>
      </div>
    );
  }
  // se tiver reservas, exibe as viagens atuais
  return (
    <div>
  <h1 className="text-2xl font-semibold mb-6">Viagens</h1>

  {bookings.map((booking: Booking) => (
    <div
      key={booking.id}
      className="grid grid-cols-[128px_1fr_1fr_auto] items-start gap-6 rounded-xl border border-neutral-200 p-4 mb-4"
    >
      {/* imagem de capa */}
      {booking.cover && (
        <Image
          src={booking.cover}
          alt={booking.location}
          width={128}
          height={128}
          className="aspect-square shrink-0 rounded-xl object-cover"
        />
      )}

      {/* tipo, localização e estrelas */}
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">{booking.type}</p>
        <p className="text-neutral-600">{booking.location}</p>
        <p className="text-neutral-600">{booking.rating} estrelas</p>
      </div>

      {/* check-in, check-out e hóspedes */}
      <div className="flex flex-col gap-1">
        <p className="text-neutral-600">Check-in: {booking.check_in}</p>
        <p className="text-neutral-00">Check-out: {booking.check_out}</p>
        <p className="text-neutral-600">Hóspedes: {booking.guests}</p>
      </div>

      {/* preço, pagamento  e id*/}
      <div className="flex flex-col gap-1">
        <p className="font-semibold">R$ {booking.total_price}</p>
        <p className="text-neutral-600">{booking.payment_method}</p>
        <p className="text-neutral-600">ID: {booking.property_id}</p>
      </div>
    </div>
  ))}
</div>
  );
}