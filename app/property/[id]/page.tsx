import Grid from "../../components/home-list/grid";
import Image from "next/image";
import Header from "../../components/header/header";
async function getProperty(id: string) {
  const res = await fetch(`http://localhost:3000/api/properties/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}
export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) {
    return <div className="p-8">Propriedade não encontrada</div>;
  }

  const gallery = property.images ?? [
    property.imageUrl,
    property.imageUrl,
    property.imageUrl,
    property.imageUrl,
    property.imageUrl,
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="bg-white max-w-[1200px] mx-auto">
        <Header />
        {/* Título e ações */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">{property.type}</h1>
          <div className="flex gap-4 text-sm font-medium underline text-neutral-600">
            <button>Compartilhar</button>
            <button>Salvar</button>
          </div>
        </div>

        {/* Galeria */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[400px]">
          <div className="col-span-2 row-span-2 relative">
            <Image src={gallery[0]} alt="" fill className="object-cover" />
          </div>
          {gallery.slice(1, 5).map((img: string, i: number) => (
            <div key={i} className="relative">
              <Image src={img} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8">
          {/* Coluna esquerda */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold text-neutral-600">
              Espaço inteiro: {property.type.toLowerCase()} em{" "}
              {property.location}
            </h2>
            <p className="text-neutral-600 mt-1">
              {property.guests ?? 2} hóspedes · {property.bedrooms ?? 1} quarto
              {(property.bedrooms ?? 1) > 1 ? "s" : ""} · {property.beds ?? 1}{" "}
              camas · {property.bathrooms ?? 1} banheiro
            </p>
            <p className="mt-2 flex items-center gap-1 text-neutral-500">
              ★ {property.rating} ·{" "}
              <span className="underline">
                {property.reviewCount ?? 0} avaliações
              </span>
            </p>

            <hr className="my-6" />

            <div className="flex items-center gap-3 text-neutral-600">
              <div className="w-12 h-12 rounded-full bg-neutral-200" />
              <div>
                <p className="font-medium">
                  Anfitriã(o): {property.hostName ?? "Anfitrião"}
                </p>
                {property.isSuperhost && (
                  <p className="text-sm text-neutral-500">Superhost</p>
                )}
              </div>
            </div>

            <hr className="my-6" />

            <p className="whitespace-pre-line text-neutral-600">
              {property.description}
            </p>

            <hr className="my-6" />

            <h3 className="text-lg font-semibold mb-4 text-neutral-600">
              O que esse lugar oferece
            </h3>
            <div className="grid grid-cols-2 gap-y-3">
              <div className="flex items-center gap-3">
                <span>•</span>
                <span>
                  Permite pets: {property.allows_pets ? "Sim" : "Não"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>•</span>
                <span>Wi-Fi: {property.has_wifi ? "Sim" : "Não"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>•</span>
                <span>
                  Estacionamento: {property.has_parking ? "Sim" : "Não"}
                </span>
              </div>
            </div>
          </div>

          {/* Coluna direita - card de reserva */}
          <div>
            <div className="border rounded-xl shadow-lg p-6 sticky top-8">
              <p className="text-lg text-neutral-600">
                Total:{" "}
                <span className="font-semibold">
                  R$ {Number(property.price_per_night)}
                </span>
              </p>
              <div className="border rounded-lg mt-4">
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-3">
                    <p className="text-xs font-semibold text-neutral-600">
                      CHECK-IN
                    </p>
                    <p className="text-sm text-neutral-500">Selecionar data</p>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-neutral-600">
                      CHECKOUT
                    </p>
                    <p className="text-sm text-neutral-500">Selecionar data</p>
                  </div>
                </div>
                <div className="border-t p-3">
                  <p className="text-xs font-semibold text-neutral-600">
                    HÓSPEDES
                  </p>
                  <p className="text-sm text-neutral-500">
                    {property.guests ?? 1} hóspede(s)
                  </p>
                </div>
              </div>
              <button className="w-full bg-pink-600 text-white rounded-lg py-3 mt-4 font-semibold hover:bg-pink-700 transition-colors">
                Reservar
              </button>
              <p className="text-center text-sm text-neutral-500 mt-2">
                Você ainda não será cobrado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
