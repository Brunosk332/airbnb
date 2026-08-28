'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function NavigationBar() {
  const pathname = usePathname();
  const isPropertyPage = pathname.startsWith("/property");
    return (
      <div className="flex flex-row  gap-18">
         {isPropertyPage ? (
          <>
    <div className="flex flex-row items-center justify-center">
    <Image src="/img/globe.png" alt="" width={35} height={35} />
    <Link href="/home" className="text-base font-bold text-neutral-500 
hover:text-black">Tudo</Link>
  </div>
  <div className="flex flex-row items-center justify-center">
    <Image src="/img/house.png" alt="" width={35} height={35} />
    <Link href="/homes" className="text-base font-bold text-neutral-500 
hover:text-black">Acomodações</Link>
  </div>
<div className="flex flex-row items-center justify-center">
  <Image src="/img/balloon.png" alt="" width={35} height={35} />
  <Link href="/experiences" className="text-base font-bold text-neutral-500 
hover:text-black">Experiências</Link>
  </div> 
    <div className="flex flex-row items-center justify-center">
      <Image src="/img/cloche.png" alt="" width={35} height={35} />
      <Link href="/services" className= "text-base font-bold text-neutral-500 hover:text-black" >Serviços</Link>
</div>
      </>
) : (
     <>
    <div className="flex flex-row items-center justify-center">
      <Image src="/img/globe.png" alt="" width={35} height={35} />
      <Link href="/home" className="text-base font-bold text-neutral-500 hover:text-black">Tudo</Link>
    </div>
    <div className="flex flex-row items-center justify-center">
      <Image src="/img/house.png" alt="" width={35} height={35} />
      <Link href="/homes" className="text-base font-bold text-neutral-500 hover:text-black">Acomodações</Link>
    </div>
  <div className="flex flex-row items-center justify-center">
    <Image src="/img/balloon.png" alt="" width={35} height={35} />
    <Link href="/experiences" className="text-base font-bold text-neutral-500 hover:text-black">Experiências</Link>
    </div>
      <div className="flex flex-row items-center justify-center">
        <Image src="/img/cloche.png" alt="" width={35} height={35} />
        <Link href="/services" className= "text-base font-bold text-neutral-500 hover:text-black">Serviços</Link>
        </div>
        </>
        )}
    </div >
    
  
    );
  }