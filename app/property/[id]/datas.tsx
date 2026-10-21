import { BookingDatesProvider } from "../../context/bookingContext";

export default function Data({ children }: { children: React.ReactNode }) {
    return <BookingDatesProvider>{children}</BookingDatesProvider>;
    
}