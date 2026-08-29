import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="relative w-320 h-190">
        <Image
          src="/img/img-cavalo.png"
          alt="Em breve"
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <h1 className="text-2xl font-semibold mt-6">Essa seção ainda não existe</h1>
    </div>
  );
}