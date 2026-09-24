"use client";
import { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingProps {
    property: { id: string; price: number; guests?: number; }
}
interface Booking {
    check_in: string;
    check_out: string;
}

// Componente visual customizado que serve de "input" pro DatePicker
const DateCell = forwardRef<HTMLDivElement, { label: string; value?: string; onClick?: () => void }>(
    ({ label, value, onClick }, ref) => (
        <div className="p-3 cursor-pointer" onClick={onClick} ref={ref}>
            <p className="text-xs font-semibold text-neutral-600">{label}</p>
            <p className="text-sm text-neutral-500">{value || "Selecionar data"}</p>
        </div>
    )
);
DateCell.displayName = "DateCell";

export default function Booking({ property }: BookingProps) {
    const [bookedDates, setBookedDates] = useState<Booking[]>([]);
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    useEffect(() => {
        async function fetchAvailability() {
            const res = await fetch(`/api/properties/${property.id}/availability`);
            if (!res.ok) {
                console.error("Failed to fetch availability");
                return;
            }
            const data = await res.json();
            setBookedDates(data);
        }
        fetchAvailability();
    }, [property.id]);

    const excludedIntervals = bookedDates.map((booking) => ({
        start: new Date(booking.check_in),
        end: new Date(booking.check_out),
    }));

    const formatDate = (date: Date | null) =>
        date ? date.toLocaleDateString("pt-BR") : undefined;

    return (
        <div className="border rounded-lg mt-4">
            <div className="grid grid-cols-2 divide-x">
                <DatePicker
                    selected={checkIn}
                    onChange={(date: Date | null) => setCheckIn(date)}
                    excludeDateIntervals={excludedIntervals}
                    minDate={new Date()}
                    customInput={<DateCell label="CHECK-IN" value={formatDate(checkIn)} />}
                />
                <DatePicker
                    selected={checkOut}
                    onChange={(date: Date | null) => setCheckOut(date)}
                    excludeDateIntervals={excludedIntervals}
                    minDate={checkIn ? new Date(checkIn.getTime() + 24 * 60 * 60 * 1000) : new Date()}
                    customInput={<DateCell label="CHECKOUT" value={formatDate(checkOut)} />}
                />
            </div>
            <div className="border-t p-3">
                <p className="text-xs font-semibold text-neutral-600">HÓSPEDES</p>
                <p className="text-sm text-neutral-500">
                    {property.guests ?? 1} hóspede(s)
                </p>
            </div>
        </div>
    );
}