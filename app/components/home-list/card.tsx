import { Property } from "./grid";
import Link from "next/link";
import Image from "next/image";
// exibe as propriedades na pagina inicial
export default function Card({ property }: { property: Property }) {
  return (
    <Link href={`/property/${property.id}`}>
      <div className="flex flex-col cursor-pointer group">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <Image
            src={property.url ?? "/img/placeholder.jpg"}
            alt=""
            fill
            unoptimized
            className="w-full h-full group-hover:scale-105 transition-transform duration-300 object-cover object-center"
          />
        </div>
        <div className="mt-2">
          <h3 className="text-sm truncate font-semibold text-neutral-900">
            {property.type} · {property.location}
          </h3>
          <p className="text-sm mt-1">
            {/* CONVERTE O PREÇO PARA BRL */}
            <span className="text-neutral-800">
              Noite: R${" "}
              {Number(property.price_per_night).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {Number(property.total_reviews) > 0 ? (
                <>· ★ {Number(property.rating).toFixed(1)} </>
              ) : (
                <span>
                  <br /> Sem avaliações
                </span>
              )}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
