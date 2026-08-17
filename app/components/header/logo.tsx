import Image from "next/image";
export function Logo() {
    return (
        <div className="flex items-center m-2" >
          <Image src="/img/logo.png" alt="" width={35} height={35} />
          <h2 className="hidden min-[900px]:block text-xl font-bold text-orange-600 m-1">airbnb</h2>
          </div>
      );
  }