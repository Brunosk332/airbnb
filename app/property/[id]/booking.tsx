"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface BookingProps {
    property: {id: string; price: number;}
}
interface Booking {
    check_in: string;
    check_out: string;
}
export default function Booking({ property }: BookingProps) {
    const [bookedDates, setBookedDates] = useState<Booking[]>([]);
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    useEffect(() => {
        async function fetchAvailability() {
            const res = await fetch(`/api/properties/${property.id}/availability`);
            const data = await res.json();
            setBookedDates(data);
        }
        fetchAvailability();
    }, [property.id]);

    const excludedIntervals = bookedDates.map((booking) => ({
        start: new Date(booking.check_in),
        end: new Date(booking.check_out),
    }));
    return (
        <div>
        <h3>Selecione as datas</h3>
        <div>
            <label>Check-in</label>
            <DatePicker
                selected={checkIn}
                onChange={(date: Date | null) => setCheckIn(date)}
                excludeDateIntervals={excludedIntervals}
                minDate={new Date()}
                placeholderText="Selecione o check-in"
            />
        </div>
        <div>
            <label>Check-out</label>
            <DatePicker
                selected={checkOut}
                onChange={(date: Date | null) => setCheckOut(date)}
                excludeDateIntervals={excludedIntervals}
                minDate={checkIn ? new Date(checkIn.getTime() +24 * 60 * 60 * 1000): new Date()}
                placeholderText="Selecione o check-out"
            />
        </div>
        <div className="border rounded-lg mt-4">
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-3">
                    <p className="text-xs font-semibold text-neutral-600">
                      CHECK-IN
                    </p>
                    <p className="text-sm text-neutral-500">Selecionar data</p>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-neutral-600">
                      CHECKOUT
                    </p>
                    <p className="text-sm text-neutral-500">Selecionar data</p>
                  </div>
                </div>
                <div className="border-t p-3">
                  <p className="text-xs font-semibold text-neutral-600">
                    HÓSPEDES
                  </p>
                  <p className="text-sm text-neutral-500">
                  </p>
                </div>
              </div>
        </div>
    )
}
//Resolver o property.id indefinido — trocar a forma de pegar o ID da propriedade. Duas opções (você escolhe uma quando voltar, sem pressa):
//Usar useParams() do next/navigation pra pegar o ID direto da URL
//Ou receber property como prop vinda do page.tsx pai
//Terminar o booking.tsx: usar os bookedDates retornados pra desabilitar essas datas no calendário de reserva (formato excludeDateIntervals se usar react-datepicker).
//Voltar pra rota POST /api/bookings: você já tem a checagem de sessão e a validação de datas prontas. Falta:
//A query SQL de conflito (OVERLAPS) — isso é só uma condição matemática comparando duas datas, mais simples do que parece
//O INSERT da reserva se não houver conflito
//Formulário no frontend: conectar o botão "Reservar" pra chamar essa rota POST.