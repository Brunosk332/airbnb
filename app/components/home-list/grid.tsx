import Card from "./card";
export interface Property {
    id: string;
    imageUrl: string;
    period: string;
    location: string;
    pricePerNight: number;
    rating: number;
}
interface GridProps {
    properties: Property[];
}
export default function Grid({properties}: GridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 py-6">
            {properties.map((property) => (
                <Card key={property.id} property={property} />
            ))}
        </div>
    );
}