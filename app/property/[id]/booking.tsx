"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerPage from "../../components/datepicker/datepicker";
import { useBookingDates } from "../../context/bookingContext";

interface BookingProps {
  property: { id: string; price: number; max_guests: number };
}
interface Booking {
  check_in: string;
  check_out: string;
}

//revisar
export default function Booking({ property }: BookingProps) {

  const [guests, setGuests] = useState<number>(1);
  const [guestsMenu, setGuestsMenu] = useState(false);
  const { checkIn: contextIn, checkOut: contextOut} =  useBookingDates();
  const checkIn = contextIn;
  const checkOut = contextOut
  const router = useRouter();

  function handleBooking() {
    if (!checkIn || !checkOut) return;
    const params = new URLSearchParams({
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests: guests.toString(),
    });
    router.push(`/property/${property.id}/payment?${params}`);
  }

  return (
    <>
      <div className="border rounded-lg mt-4">

<DatePickerPage propertyId={property.id} checkIn={checkIn} checkOut={checkOut}/>
        <div className="border-t p-3">
          <p className="text-xs font-semibold text-neutral-600">HÓSPEDES</p>
          <p className="text-sm text-neutral-500 hover:cursor-pointer" onClick={() => setGuestsMenu(!guestsMenu)}>
            {guests} Hóspedes(s)
          </p>
        </div>a
      </div>
      <button
        onClick={handleBooking}
        className="w-full bg-pink-600 text-white rounded-lg py-3 mt-4 font-semibold hover:bg-pink-700 
                    transition-colors"
      >
        Reservar
      </button>
      {guestsMenu && (
        <div className="absolute inset-0 flex items-start justify-center sm:top-10 sm:items-center sm:bottom-10">
          <div className="w-full max-w-lg px-4 py-18 bg-white sm:shadow-xl sm:rounded-4xl">
            <span className="block text-stone-700 text-3xl py-3">
              Adicionar hóspedes
            </span>

            <input
              type="text"
              placeholder="Número de hóspedes"
              value={guests}
              min="1"
              max="4"
              step="1"
              readOnly
              onChange={(e) => setGuests(Number(e.target.value))}
              className="border-2 mt-4 block w-full rounded-xl py-4 px-5 border-neutral-300 text-md 
text-neutral-700 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
            <div className="flex justify-center gap-8">
              <button
                type="button"
                onClick={() => setGuests(Math.min(property.max_guests, guests + 1))}
                className="border-2 mt-4 block w-full rounded-xl py- px-5 border-neutral-300 text-md 
text-neutral-500 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none text-5xl"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="border-2 mt-4 
block w-full rounded-xl py- px-5 border-neutral-300 text-md text-neutral-500 hover:border-neutral-400 
focus:border-neutral-400 focus:outline-none text-5xl"
              >
                -
              </button>
            </div>
            <button
              type="submit"
              className="bg-linear-to-r from-red-500 via-rose-500 to-pink-600 text-white font-semibold py-3 px-6 
rounded-xl w-full mt-3"
              onClick={() => setGuestsMenu(false)}
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
