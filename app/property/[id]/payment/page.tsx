import PaymentForm from "./paymentForm";

async function getProperty(id: string) {
    const res = await fetch(`http://localhost:3000/api/properties/${id}`, { cache: "no-store" });
    if (!res.ok) {
        return null;
    }
    return res.json();
}

export default async function ConfirmPayment({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ checkIn?: string; checkOut?: string }>;
}) {
    const { id } = await params;
    const { checkIn: checkInParam, checkOut: checkOutParam } = await searchParams;

    if (!checkInParam || !checkOutParam) {
        return <div className="p-8">Datas de reserva não encontradas</div>;
    }

    const property = await getProperty(id);
    if (!property) {
        return <div className="p-8">Propriedade não encontrada</div>;
    }

    return (
        <PaymentForm
            property={property}
            checkIn={new Date(checkInParam)}
            checkOut={new Date(checkOutParam)}
        />
    );
}