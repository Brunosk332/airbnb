import Card from "./card";
export interface Property {
    id: string;
    imageUrl: string;
    images?: string[];
    cover_image?: string;
    type: string;
    period: string;
    location: string;
    pricePerNight: number;
    rating: number;
    reviewCount?: number;
    guests?: number;
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
    hostName?: string;
    isSuperhost?: boolean;
    description?: string;
    amenities?: string[];
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