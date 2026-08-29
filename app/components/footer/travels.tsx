"use client";

import { useState } from "react";

export default function TravelInspiration() {
    const categories = ["Popular", "Litoral", "Histórica", "Ilhas", "Atividades ao ar livre", 
        "Coisas para fazer"];
        
        const destinations = [
          { city: "Gravatá", type: "Aluguéis de casas" },
          { city: "Dourados", type: "Aluguéis de apartamentos" },
          { city: "São Bento do Sapucaí", type: "Aluguéis de cabanas" },
          { city: "Santo André", type: "Aluguéis de apartamentos" },
          { city: "Ponta Grossa", type: "Locações por temporada" },
          { city: "Atibaia", type: "Aluguéis de cabanas" },
          { city: "Botucatu", type: "Aluguéis por temporada" },
          { city: "São Roque", type: "Aluguéis de chalés" },
          { city: "Bragança Paulista", type: "Aluguéis de chalés" },
          { city: "Pirenópolis", type: "Aluguéis de apartamentos" },
          { city: "Paris", type: "Aluguéis por temporada" },
          { city: "Canoas", type: "Locações por temporada" },
          { city: "Criciúma", type: "Aluguéis de apartamentos" },
          { city: "Santiago Centro", type: "Aluguéis por temporada" },
          { city: "Itapoá", type: "Aluguéis de casas" },
          { city: "Canela", type: "Locações por temporada" },
          { city: "Araraquara", type: "Aluguéis por temporada" },
        ];
        
  const [active, setActive] = useState("Popular");

  return (
    <div className="max-w-[1852px] mx-auto px-4 py-10 bg-white text-neutral-500">
      <h2 className="text-2xl font-semibold mb-4">Inspiração para viagens futuras</h2>

      <div className="flex gap-6 border-b mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`pb-3 text-sm font-medium ${
              active === cat
                ? "border-b-2 border-black text-black"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-6">
        {destinations.map((d) => (
          <div key={d.city}>
            <p className="font-semibold text-sm">{d.city}</p>
            <p className="text-sm text-neutral-500">{d.type}</p>
          </div>
        ))}
      </div>

      <button className="text-sm font-medium underline mt-4">Mostrar mais ⌄</button>
    </div>
  );
}