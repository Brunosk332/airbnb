"use client";
import { useState, useRef, useEffect } from "react"; // ← tudo importado junto, no topo
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
// page
export function MenuButton() {
  //hooks
  const [MenuOpen, setMenuOpen] = useState(false);
  const [logoutMenu, setLogoutMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const submittingRef = useRef(false);
  // useEffect para fechar o menu quando o usuário clicar em algum lugar da página
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
  // handler para o usuário desconectar de sua conta
  async function logoutHandler() {
    // loading para garantir que não chame a api 2 vezes ao mesmo tempo
    if (submittingRef.current) return;
    submittingRef.current = true;
    setLoading(true);
    try {
    const res = await logout();
    if (!res.success) {
      setError( res.message ?? "Erro ao sair da conta");
      return;
    }
    // seta o loading como false e reinicia a página

    setLogoutMenu(false);
    setMenuOpen(false);

  } finally {
     submittingRef.current = false;
     setLoading(false);
  }
  }
// JSX
  return (
    <div ref={menuRef} className="relative flex items-center">
      {/*botao menu */}
      <button
        onClick={() => setMenuOpen(!MenuOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 
  hover:bg-gray-300 transition cursor-pointer"
      >
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
        <div className="bg-white rounded-lg shadow-md absolute top-20 right-8 z-999 w-66 p-2 text-sm text-gray-900">
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
              <path
                strokeLinecap="round"
                d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4"
              ></path>
              <circle cx="12" cy="17" r="0.5" fill="currentColor"></circle>
            </svg>
            <span className="font-semibold text-stone-700">
              Central de Ajuda
            </span>
          </button>
          <hr className="mx-4 border-stone-400 my-3" />
          <button className="w-full text-left px-6 py-1.5 hover:bg-gray-100 flex items-center justify-between gap-3">
            <Link href="/login" className="flex flex-col ">
              <span className="font-semibold  text-stone-900">
                Torne-se um anfitrião
              </span>
              <span className="w-full text- text-xs">
                É fácil começar a receber hóspedes, oferecer serviços ou
                experiências e ganhar uma renda extra.
              </span>
            </Link>
            <Image
              src="/img/anfitriao.png"
              alt=""
              width={50}
              height={50}
              className="object-contain shrink-0"
            />
          </button>
          <hr className="mx-4 border-stone-400 my-3" />
          <button
            className="w-full text-left px-6 py-1.5 hover:bg-gray-100 flex items-center 
gap-3"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-stone-700">
                Encontre um coanfitrião
              </span>
            </div>
          </button>
          <button
            className="w-full text-left px-6 py-1.5 hover:bg-gray-100 flex items-center 
gap-3"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-stone-700">
                Cartões de presente
              </span>
            </div>
          </button>
          <hr className="mx-4 border-stone-400 my-3" />
          <div className="w-full text-left flex items-center gap-3">
            <div className="flex flex-col w-full">
              {!user && (
                <Link
                  href="/login"
                  className="w-full px-6 py-1.5 hover:bg-gray-100 font-semibold text-stone-700"
                >
                  Entrar ou cadastrar-se
                </Link>
              )}
              {user && (
                <button
                  onClick={() => setLogoutMenu(true)}
                  className="w-full text-left px-6 py-1.5 hover:bg-gray-100 font-semibold text-stone-700"
                >
                  Desconectar-se
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {logoutMenu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setLogoutMenu(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-gray-900">
              Sair da conta
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Tem certeza que deseja sair da sua conta?
            </p>

            {error && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => (setError(""), setLogoutMenu(false))}
                className="rounded-lg border border-gray-300 px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={logoutHandler}
                disabled={loading}
                className="rounded-lg bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700"
              >
                {loading ? "Saindo..." : "Sair"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
