import Image from "next/image";
import Link from "next/link";
interface RoomProps {
  title: string;
  photo: string;
  period: string;
  totalPrice: number;
  rating: number; // ex: 4.5 (de 0 a 5)
}
//LOGO AIRBNB
export function Logo() {
  return (
      <div className="flex items-center m-2" >
        <Image src="/img/logo.png" alt="" width={35} height={35} />
        <h2 className="hidden min-[900px]:block text-xl font-bold text-orange-600 m-1">airbnb</h2>
        </div>
    );
}
//NAVIGATION BAR
export function NavigationBar() {
  return (
    <div className="flex flex-row  gap-18">
  <div className="flex flex-row items-center justify-center">
    <Image src="/img/globe.png" alt="" width={35} height={35} />
    <h2 className="text-base font-bold text-gray-500 hover:text-black">Tudo</h2>
  </div>
  <div className="flex flex-row items-center justify-center">
    <Image src="/img/house.png" alt="" width={35} height={35} />
    <h2 className="text-base font-bold text-gray-500 hover:text-black">Acomodações</h2>
  </div>
<div className="flex flex-row items-center justify-center">
  <Image src="/img/balloon.png" alt="" width={35} height={35} />
  <h2 className="text-base font-bold text-gray-500 hover:text-black">Experiências</h2>
  </div>
    <div className="flex flex-row items-center justify-center">
      <Image src="/img/cloche.png" alt="" width={35} height={35} />
      <h2 className= "text-base font-bold text-gray-500 hover:text-black">Serviços</h2>
      </div>
  </div >
  );
}
export function Room({ title, photo, period, totalPrice, rating }: RoomProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <img src={photo} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg">{title}</h2>

          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-1">{period}</p>

        <p className="mt-2">
          <span className="font-bold">R$ {totalPrice.toFixed(2)}</span>{" "}
          <span className="text-gray-500 text-sm">total</span>
        </p>
      </div>
    </div>
  );
}