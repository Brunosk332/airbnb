import Card from "./card";
// types 
export interface Property {
    id: string;
    url?: string;
    type: string;
    location: string;
    price_per_night: number;
    total_reviews: string
    rating: number;
  }
interface GridProps {
    properties: Property[];
}
export default function Grid({properties}: GridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 py-6 bg-white max-w-[1852px] mx-auto">
            {properties.map((property) => (
                <Card key={property.id} property={property} />
            ))}
        </div>
    );
}