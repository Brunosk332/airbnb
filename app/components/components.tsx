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
export default function Logo() {
  return (
      <div className="flex items-start m-2" >
        <Image src="/img/logo.png" alt="" width={35} height={35} />
        <h2 className="flex items-center text-2xl font-bold text-orange-600">airbnb</h2>
        </div>
    );
}
//NAVIGATION BAR ALL
export function NavigationBar() {
  return (
    <div className="flex flex-row justify-center items-center gap-8 w-full" >
  <div className="flex items-center justify-center">
    <Image src="/img/globe.png" alt="" width={35} height={35} />
    <h2 className="flex items-center text-xl font-bold text-white">Tudo</h2>
  </div>
  <div className="flex items-center justify-center">
    <Image src="/img/house.png" alt="" width={35} height={35} />
    <h2 className="flex items-center text-xl font-bold text-white">Acomodações</h2>
  </div>
<div className="flex items-center justify-center">
  <Image src="/img/balloon.png" alt="" width={35} height={35} />
  <h2 className= "flex items-center text-xl font-bold text-white">Experiências</h2>
  </div>
    <div className="flex items-center justify-center">
      <Image src="/img/cloche.png" alt="" width={35} height={35} />
      <h2 className= "flex items-center text-xl font-bold text-white">Serviços</h2>
      </div>
  </div >
  );
}
export function HelpBar() {
  return (
    <div className="flex items-end justify-right items-center gap-8 w-full" >
    <div className="flex items-center justify-center">
      <h2 className="flex items-center text-xl font-bold text-white">Torne-se um Anfitrião</h2>
    </div>
    <div className="flex items-center justify-center">
      <Image src="/img/house.png" alt="" width={35} height={35} />
    </div>
  <div className="flex items-center justify-center">
    <Image src="/img/balloon.png" alt="" width={35} height={35} />
    <h2 className= "flex items-center text-xl font-bold text-white">Experiências</h2>
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