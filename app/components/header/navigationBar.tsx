import Image from "next/image";
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