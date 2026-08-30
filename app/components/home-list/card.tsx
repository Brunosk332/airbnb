import { Property } from "./grid";
import Link from "next/link";
import Image from "next/image";

export default function Card({ property }: { property: Property }) {
    return (
        <Link href={`/property/${property.id}`}>
        <div className="flex flex-col cursor-pointer group">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                    src={property.cover_image ?? "/img/placeholder.jpg"}
                    alt=""
                    fill
                    unoptimized
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300 object-cover object-center"
                />
            </div>
            <div className="mt-2">
                <h3 className="font-medium text-sm truncate font-semibold text-neutral-900">
                    {property.type} · {property.location}
                </h3>
                <p className="text-sm text-neutral-800 truncate">{property.period}</p>
                <p className="text-sm mt-1">
                    <span className="text-neutral-800">
                        Total: R$ {property.pricePerNight} · ★ {property.rating}
                    </span>
                </p>
            </div>
        </div>
        </Link>
    )
}