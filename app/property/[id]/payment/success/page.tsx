
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  const propertyName = searchParams.get("propertyName");
  const propertyLocation = searchParams.get("location");
  const propertyImage = searchParams.get("image");

  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            aria-label="Voltar para a página inicial"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 transition hover:bg-neutral-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </Link>

          <h1 className="text-3xl font-semibold">
            Reserva confirmada
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <section className="rounded-xl border p-6">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF385C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-neutral-900">
              Você reservou esta propriedade!
            </h2>

            <p className="mt-3 text-neutral-600">
              Sua reserva foi registrada. Você pode consultar os
              detalhes na área de suas reservas.
            </p>

            <div className="mt-8 space-y-3">
              <Link
                href="/profile/reservations"
                className="block w-full rounded-lg bg-[#FF385C] px-6 py-3 text-center font-medium text-white transition hover:bg-[#e31c5f]"
              >
                Ver minhas reservas
              </Link>

              <Link
                href="/"
                className="block w-full rounded-lg border border-neutral-300 px-6 py-3 text-center font-medium transition hover:bg-neutral-50"
              >
                Voltar para a página inicial
              </Link>
            </div>
          </section>

          <section className="h-fit rounded-xl border p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Sua propriedade
            </h2>

            {propertyImage && (
              <Image
                src={propertyImage}
                alt={propertyName || "Imagem da propriedade"}
                className="mb-4 h-56 w-full rounded-lg object-cover"
              />
            )}

            <div className="border-t pt-4">
              <h3 className="text-xl font-semibold text-neutral-900">
                {propertyName || "Propriedade reservada"}
              </h3>

              {propertyLocation && (
                <p className="mt-2 text-sm text-neutral-600">
                  {propertyLocation}
                </p>
              )}

              <div className="mt-5 border-t pt-4">
                <p className="text-sm text-neutral-500">
                  Status
                </p>
                <p className="mt-1 font-medium text-neutral-900">
                  Reserva confirmada
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
