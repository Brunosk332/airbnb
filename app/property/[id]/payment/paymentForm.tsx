"use client";
import { useState } from "react";

interface PaymentFormProps {
    property: {
        type: string;
        images: string[];
        reviews: number;
        location: string;
        price_per_night: number;
        guests?: number;
    };
    checkIn: Date;
    checkOut: Date;
}
export default function PaymentForm({ property, checkIn, checkOut }: PaymentFormProps) {
    const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("card");

    const price = Number(property.price_per_night)

    const nights = Math.round(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
    const total = price * nights;
    const juros = total * 1.108;

    const formatDate = (date: Date) =>
        date.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex items-center gap-4 mb-8">
                <button className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                    ←
                </button>
                <h1 className="text-3xl font-semibold">Confirmar e pagar</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="border rounded-xl p-6">
                    <h2 className="font-semibold text-lg mb-1">
                        1. Adicione uma forma de pagamento
                    </h2>
                    <p className="text-sm text-neutral-600 mb-4">
                        Formas de pagamento disponíveis para <strong>BRL</strong>.{" "}
                        <span className="underline cursor-pointer">Alterar moeda</span>
                    </p>

                    <div className="space-y-3">
                        <label className="flex items-center justify-between border-b pb-3 cursor-pointer">
                            <div>
                                <p className="font-medium">Pix</p>
                                <p className="text-sm text-neutral-500">Parcelamento não disponível</p>
                            </div>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "pix"}
                                onChange={() => setPaymentMethod("pix")}
                            />
                        </label>

                        <label className="flex items-center justify-between pb-3 cursor-pointer">
                            <div>
                                <p className="font-medium">Cartão de crédito</p>
                                <p className="text-sm text-neutral-500">
                                    ou em 12x de R$ {(juros / 12).toFixed(2)}
                                </p>
                            </div>
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "card"}
                                onChange={() => setPaymentMethod("card")}
                            />
                        </label>
                    </div>

                    {paymentMethod === "card" && (
                        <div className="border rounded-lg mt-4">
                            <input type="text" placeholder="Número do cartão" className="w-full p-3 border-b outline-none" />
                            <div className="grid grid-cols-2">
                                <input type="text" placeholder="Validade" className="p-3 border-r outline-none" />
                                <input type="text" placeholder="CVV" className="p-3 outline-none" />
                            </div>
                        </div>
                    )}

                    <h3 className="font-semibold mt-6 mb-1">Informações fiscais</h3>
                    <p className="text-sm text-neutral-600 mb-4">
                        Digite suas informações exatamente como aparecem em seu documento de identificação.
                    </p>

                    <div className="border rounded-lg divide-y">
                        <input type="text" placeholder="Nome legal completo" className="w-full p-3 outline-none" />
                        <input type="text" placeholder="CPF" className="w-full p-3 outline-none" />
                        <input type="date" placeholder="Data de nascimento" className="w-full p-3 outline-none" />
                    </div>

                    <button className="w-full bg-black text-white rounded-lg py-3 mt-6 font-medium">
                        Próximo
                    </button>
                </div>

                <div className="border rounded-xl p-6 h-fit">
                    <div className="flex gap-4">
                        <img
                            src={property.images[0]}
                            alt="/placeholder.jpg"
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                            <h3 className="font-semibold">{property.type}</h3>
                            <p className="text-sm text-neutral-600">
                                ⭐ {property.location}
                            </p>
                        </div>
                    </div>

                    <div className="border-t mt-4 pt-4">
                        <p className="font-semibold">Datas</p>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-neutral-600">
                                {formatDate(checkIn)} – {formatDate(checkOut)}
                            </p>
                            <button className="text-sm underline">Alterar</button>
                        </div>
                    </div>

                    <div className="border-t mt-4 pt-4">
                        <p className="font-semibold">Hóspedes</p>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-neutral-600">
                                {property.guests ?? 1} adulto(s)
                            </p>
                            <button className="text-sm underline">Alterar</button>
                        </div>
                    </div>

                    <div className="border-t mt-4 pt-4">
                        <p className="font-semibold mb-2">Informações de preço</p>
                        <div className="flex justify-between text-sm">
                            <p>
                                {nights} noite{nights > 1 ? "s" : ""} x R$ {price.toFixed(2)}
                            </p>
                            <p>R$ {total.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                        <p>Total BRL</p>
                        <p>R$ {total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
