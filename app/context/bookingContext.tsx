"use client"
import { createContext, useContext, useState, ReactNode } from "react";

type BookingDates = {
    checkIn: Date | null;
    checkOut: Date | null;
    setCheckIn: (date: Date | null) => void;
    setCheckOut: (date: Date | null) => void;
  };

const context = createContext<BookingDates | null>(null);

export function BookingDatesProvider({ children }: { children: ReactNode }) {
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null> (null);
    if (checkIn && checkOut && checkIn > checkOut) console.log("checkIn > checkOut")
    return (
        <context.Provider value={{ checkIn, setCheckIn, checkOut, setCheckOut }}>
            {children}
        </context.Provider>

    );
}
export function useBookingDates() {
    const contexts = useContext(context);
    if (!contexts)
        throw new Error("useBookingDates precisa estar denntro de  BookingDatesProvider");
    return contexts;
}