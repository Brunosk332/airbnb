import { Property } from "./grid";
import Image from "next/image";
export default function Card({ property }: { property: Property }) {
    return (
        <div className="flex flex-col cursor-pointer group">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image src={property.imageUrl}
                    alt=""
                    fill
                    className="w-full h-full group-hover:scale-105
transition-transform duration-300 object-cover object-center"/>

            </div>
            <div className="mt-2">
                <div className="flex justify-between items-end">
                    <h3 className="font-medium text-sm truncate">{property.location}</h3>
                </div>
                <p className="text-sm text-neutral-500 truncate">{property.period}</p>
                <p className="text-sm mt-1">
                    <span className="font-semibold">Total: R$ {property.pricePerNight} · ★ {property.rating}</span>
                    <span className="text-sm flex items-center gap-1">
                      
                    </span>
                </p>
            </div>
        </div>
    )
}
