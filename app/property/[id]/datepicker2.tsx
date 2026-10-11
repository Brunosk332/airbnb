"use client";
import { useState, useEffect, forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, tomorrowInBrasilia, formatDate } from "@/lib/dates";

registerLocale("pt-BR", ptBR);

interface DatePickerProps {
  property: { id: string | number };
}

interface Booking {
  check_in: string;
  check_out: string;
}

// botão de selecionar datas
export const DateCell = forwardRef<
  HTMLDivElement,
  { label: string; value?: string; onClick?: () => void }
>(({ label, value, onClick }, ref) => (
  <div className="p-3 cursor-pointer" onClick={onClick} ref={ref}>
    <p className="text-xs font-semibold text-neutral-600">{label}</p>
    <p className="text-sm text-neutral-500">{value || "Selecionar data"}</p>
  </div>
));
DateCell.displayName = "DateCell";

// transforma o texto da URL em Date (ou null se não existir)
function readDate(value: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export default function DatePickerPage({ property }: DatePickerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [bookedDates, setBookedDates] = useState<Booking[]>([]);
  const [checkIn, setCheckIn] = useState<Date | null>(() =>
    readDate(searchParams.get("checkIn")),
  );
  const [checkOut, setCheckOut] = useState<Date | null>(() =>
    readDate(searchParams.get("checkOut")),
  );

  useEffect(() => {
    async function fetchAvailability() {
      const res = await fetch(`/api/properties/${property.id}/availability`);
      if (!res.ok) {
        console.error("Failed to fetch availability");
        return;
      }
      setBookedDates(await res.json());
    }
    fetchAvailability();
  }, [property.id]);

  const excludedIntervals = bookedDates.map((booking) => ({
    start: new Date(booking.check_in),
    end: new Date(booking.check_out),
  }));

  // grava as datas na URL (mantém os outros parâmetros, como guests)
  function saveToUrl(newCheckIn: Date | null, newCheckOut: Date | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (newCheckIn) params.set("checkIn", newCheckIn.toISOString());
    else params.delete("checkIn");
    if (newCheckOut) params.set("checkOut", newCheckOut.toISOString());
    else params.delete("checkOut");
    router.replace(`?${params}`);
  }

  function handleCheckIn(date: Date | null) {
    let newCheckOut = checkOut;
    // se o checkout ficou antes do novo check-in, empurra para o dia seguinte
    if (date && checkOut && checkOut <= date) newCheckOut = addDays(date, 1);
    setCheckIn(date);
    setCheckOut(newCheckOut);
    saveToUrl(date, newCheckOut);
  }

  function handleCheckOut(date: Date | null) {
    setCheckOut(date);
    saveToUrl(checkIn, date);
  }

  return (
    <div className="grid grid-cols-2 divide-x">
      <DatePicker
        selected={checkIn}
        onChange={handleCheckIn}
        excludeDateIntervals={excludedIntervals}
        minDate={tomorrowInBrasilia()}
        locale="pt-BR"
        dateFormat="dd/MM/yyyy"
        customInput={<DateCell label="CHECK-IN" value={formatDate(checkIn)} />}
      />
      <DatePicker
        selected={checkOut}
        onChange={handleCheckOut}
        excludeDateIntervals={excludedIntervals}
        minDate={checkIn ? addDays(checkIn, 1) : tomorrowInBrasilia()}
        locale="pt-BR"
        dateFormat="dd/MM/yyyy"
        customInput={<DateCell label="CHECKOUT" value={formatDate(checkOut)} />}
      />
    </div>
  );
}