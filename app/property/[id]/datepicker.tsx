"use client";
import { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBookingDates } from "../../context/bookingContext";
import {
  addDays,
  tomorrowInBrasilia,
  formatDate,
} from "@/lib/dates";

interface DatePickerProps {
  propertyId: string | number;
  checkIn: Date | null;
  checkOut: Date | null;
}
interface Booking {
  check_in: string;
  check_out: string;
}
// partee onde aparecem as datas
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
//revisar
export default function DatePickerPage({ propertyId }: DatePickerProps) {
  const [bookedDates, setBookedDates] = useState<Booking[]>([]);
  const { checkIn, checkOut, setCheckIn, setCheckOut } = useBookingDates();
  useEffect(() => {
    async function fetchAvailability() {
      const res = await fetch(`/api/properties/${propertyId}/availability`);
      if (!res.ok) {
        console.error("Failed to fetch availability");
        return;
      }
      const data = await res.json();
      setBookedDates(data);
    }
    fetchAvailability();
  }, [propertyId]);
  // datas que estarao bloqueadas para o usuario, já reservadas
  const excludedIntervals = bookedDates.map((booking) => ({
    start: new Date(booking.check_in),
    end: new Date(booking.check_out),
  }));

  function handleCheckIn(date: Date | null) {
    setCheckIn(date);
    console.log("handle checkin");
    if (!date) {
      setCheckOut(null);
      return;
    }
    if (checkOut && checkOut <= date) {
      setCheckOut(addDays(date, 1));
      return;
    }
    setCheckIn(date);
  }
  console.log("Amanhã:", tomorrowInBrasilia());
console.log("Timestamp:", tomorrowInBrasilia().getTime());
  return (
    <div className="grid grid-cols-2 divide-x">
      <DatePicker
        selected={checkIn}
        onChange={(date: Date | null) => {
            handleCheckIn(date);
        }}
        excludeDateIntervals={excludedIntervals}
        minDate={new Date(tomorrowInBrasilia())}
        dateFormat="dd/MM/yyyy"
        customInput={<DateCell label="CHECK-IN" value={formatDate(checkIn)} />}
      />
      <DatePicker
        selected={checkOut}
        onChange={
          (date: Date | null) => {
          setCheckOut(date);
        }}
        excludeDateIntervals={excludedIntervals}
        dateFormat="dd/MM/yyyy"
        minDate={checkIn ? addDays(checkIn, 1) : tomorrowInBrasilia()}
        customInput={
          <DateCell label="CHECK-OUT" value={formatDate(checkOut)} />
        }
      />
    </div>
  );
}
