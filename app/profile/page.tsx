"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

type Tab = "sobre" | "viagens" | "conexoes";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("sobre");
  const { user } = useAuth();

  const initial = user?.name?.charAt(0).toUpperCase() ?? "?";

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "sobre", label: "Sobre mim", icon: "👤" },
    { id: "viagens", label: "Viagens anteriores", icon: "🧳" },
    { id: "conexoes", label: "Conexões", icon: "👥" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] max-w-5xl mx-auto px-4 py-10 gap-8">
      {/* Sidebar */}
      <div>
        <h1 className="text-3xl font-semibold mb-6">Perfil</h1>
        <nav className="flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium ${
                activeTab === tab.id ? "bg-neutral-100" : "hover:bg-neutral-50"
              }`}
            >
              {tab.id === "sobre" ? (
                <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-semibold">
                  {initial}
                </span>
              ) : (
                <span className="text-xl">{tab.icon}</span>
              )}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo */}
      <div>
        {activeTab === "sobre" && <SobreMim initial={initial} name={user?.name} />}
        {activeTab === "viagens" && <ViagensAnteriores />}
        {activeTab === "conexoes" && <Conexoes />}
      </div>
    </div>
  );
}

function SobreMim({ initial, name }: { initial: string; name?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Sobre mim</h2>
        <button className="border rounded-full px-4 py-2 text-sm font-medium hover:bg-neutral-50">
          Editar
        </button>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        <div className="border rounded-2xl p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-800">
            {initial}
          </div>
          <p className="text-xl font-bold mt-4">{name ?? "Visitante"}</p>
          <p className="text-neutral-500">Hóspede</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Preencha seu perfil</h3>
          <p className="text-neutral-600 mb-4">
            O perfil do Airbnb é uma parte importante do processo de reserva.
            Complete o seu para ajudar outros anfitriões e hóspedes a conhecer
            você melhor.
          </p>
          <button className="bg-pink-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-pink-700 transition-colors">
            Comece já
          </button>
        </div>
      </div>

      <hr className="my-8" />

      <button className="flex items-center gap-2 text-neutral-700 hover:underline">
        💬 Mostrar avaliações que eu escrevi
      </button>
    </div>
  );
}

function ViagensAnteriores() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Viagens</h2>
      <div className="flex flex-col items-center text-center max-w-sm mx-auto mt-12">
        <div className="relative w-48 h-48 mb-6">
          <Image src="https://picsum.photos/300/300?random=50" alt="" fill className="object-contain" />
        </div>
        <h3 className="text-xl font-bold mb-2">Planeje sua próxima viagem</h3>
        <p className="text-neutral-600 mb-6">
          Depois de reservar uma viagem, experiência ou serviço, volte aqui
          para conferir os detalhes, explorar o mapa e marcar lugares para visitar.
        </p>
        <button className="bg-pink-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-pink-700 transition-colors">
          Comece já
        </button>
      </div>
    </div>
  );
}

function Conexoes() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Conexões</h2>
      <div className="flex flex-col items-center text-center max-w-sm mx-auto mt-12">
        <div className="relative w-64 h-40 mb-6">
          <Image src="https://picsum.photos/400/250?random=51" alt="" fill className="object-contain" />
        </div>
        <p className="text-neutral-700 mb-6">
          Ao participar de uma experiência ou convidar alguém para uma viagem,
          você encontra os perfis de outros hóspedes aqui.{" "}
          <span className="underline cursor-pointer">Saiba mais</span>
        </p>
        <button className="bg-pink-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-pink-700 transition-colors">
          Reservar uma viagem
        </button>
      </div>
    </div>
  );
}