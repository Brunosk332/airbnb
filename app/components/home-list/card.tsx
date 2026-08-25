export default function Card({property}: {property: Property}) {
return(
    <div className="flex flex-col cursor-pointer group">
    <div className="relative w-full aspect-square rounded-xl overflow-hidden">
        <Image src={props.imageUrl} alt="" className="w-full h-full group-hover:scale-105 
transition-transform duration-300 object-cover object-center" />

    </div>
    <div className="mt-2">
        <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm truncate">{property.location}</h3>
            <span className="text-sm flex items-center gap-1">
                {hookPropertyMap.rating}
            </span>
        </div>
        <p className="text-sm text-neutral-500 truncate">{property.title}</p>
        <p className="text-sm mt-1">
            <span className="font-semibold">R$ {hookPropertyMap.pricePerNight}</span>
        </p>
    </div>
</div>   
)
}
   