'use client'
import { useState, useRef, useEffect } from "react"; // ← tudo importado junto, no topo
import Image from "next/image";
export function MenuButton() {
  const [MenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function fecharMenu(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", fecharMenu);

    return () => {
      document.removeEventListener("mousedown", fecharMenu);
    };
  }, []);

  // 
  // 
  //  
  return (
      <div ref={menuRef} className="relative flex items-center">
        <button onClick={() => setMenuOpen(!MenuOpen)} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 
  hover:bg-gray-300 transition cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" d="M4 6h16"></path>
            <path strokeLinecap="round" d="M4 12h16"></path>
            <path strokeLinecap="round" d="M4 18h16"></path>
          </svg>
        </button>
        {MenuOpen && (
          <div className="bg-white rounded-lg shadow-md absolute top-20 right-8 z10 w-66 p-2 text-sm text-gray-900">
            <button className="w-full text-left px-6 py-1.5 hover:bg-gray-100 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="9"></circle>
                <path strokeLinecap="round" d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4"></path>
                <circle cx="12" cy="17" r="0.5" fill="currentColor"></circle>
              </svg>
              <span className="font-semibold text-stone-700">Central de Ajuda</span>
            </button>
            <hr className="mx-4 border-stone-400 my-3" />
            <button className="w-full text-left px-6 py-1.5 hover:bg-gray-100 flex items-center justify-between gap-3">
              <div className="flex flex-col ">
                <span className="font-semibold  text-stone-900">Torne-se um anfitrião</span>
                <span className="w-full text- text-xs">É fácil começar a receber hóspedes, oferecer serviços ou experiências e ganhar uma renda extra.</span>
              </div>
              <Image src="/img/anfitriao.png" alt="" width={50} height={50} className="object-contain shrink-0" />
            </button>
            <hr className="mx-4 border-stone-400 my-3" />
            <button className="w-full text-left px-6 py-1.5 hover:bg-gray-100 flex items-center 
gap-3">
              <div className="flex flex-col">
                <span className="font-semibold text-stone-700">Encontre um coanfitrião</span>
              </div>
            </button>
            <button className="w-full text-left px-6 py-1.5 hover:bg-gray-100 flex items-center 
gap-3">
              <div className="flex flex-col">
                <span className="font-semibold text-stone-700">Cartões de presente</span>
              </div>
            </button>
            <hr className="mx-4 border-stone-400 my-3" />
            <button className="w-full text-left px-6 py-1.5 hover:bg-gray-100 flex items-center 
ap-3">
              <div className="flex flex-col">
                <span className="font-semibold text-stone-700">Entrar ou cadastrar-se</span>
              </div>
            </button>

          </div >
        )};
      </div>
)};
