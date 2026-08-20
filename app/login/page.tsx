import { Logo } from "../components/header/logo";
import { LanguageMenu } from "../components/header/languageMenu";
import { MenuButton } from "../components/header/menuFunctions";
import { BecomeAnHost } from "../components/header/becomeAnHost";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  return (
    <>
      <header className="flex flex-col gap-4 px-4 md:px-8 py-4 bg-neutral-100 shadow-md">
        <div className="hidden sm:grid max-w-[1852px] mx-auto grid-cols-2 items-center w-full">
          <div className="flex justify-start">
            <Logo />
          </div>
          <div className="flex justify-end items-center gap-6">
            <div>
              <BecomeAnHost />
            </div>
            <LanguageMenu />
            <MenuButton />
          </div>
        </div>
      </header>
      {/* body */}

      <div className="relative w-full h-screen">

        <Image src="/img/mosaic.png" alt="" fill className="object-cover " />

        {/* gradiente preto */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        <div className="absolute inset-0 flex items-start justify-center sm:top-10 sm-justify-center sm:items-center sm:bottom-10">
          <div className="w-full max-w-lg px-4 py-18 bg-white shadow-xl rounded-4xl">
            <div className="space-y-1 text-center">

              <Image src="/img/logo.png" alt="" width={40} height={40} className="position-relative top-px inline-block" />

              <span className="block text-stone-700 text-3xl py-3">Entrar ou cadastrar-se</span>

              <input type="email" placeholder="Número de telefone ou email" className=" border-2 mt-4 block w-full rounded-xl py-4 px-5 border-neutral-300 text-md text-neutral-700 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none" />

              <span className=" block text-neutral-600 text-sm text-left">Enviaremos um código de confirmação por mensagem de texto ou email. Sujeito a taxas de dados e mensagens.
                <Link className="text-neutral-600" href="/sobre">Política de privacidade</Link></span>

              <button className="bg-linear-to-r from-red-500 via-rose-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl w-full mt-3">Enviar</button>


              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-px bg-neutral-300" />
                <span className="text-neutral-500 text-sm">ou</span>
                <div className="flex-1 h-px bg-neutral-300" />
              </div>

              <div className="flex gap-3 justify-center mt-4 ">
                <div className="border-[1.5px] border-neutral-300 rounded-2xl p-3">
                  <Image src="/img/google-logo.webp" alt="" width={30} height={40} className="position-relative top-px inline-block" />
                </div>
                <div className="border-[1.5px] border-neutral-300 rounded-2xl p-3">
                  <Image src="/img/apple-logo.png" alt="" width={30} height={40} className="position-relative top-px inline-block" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 flex justify-around items-center py-8 sm:hidden z-50">
        <button className="flex flex-col items-center text-xs text-neutral-900">
          <span></span>
          Explorar
        </button>
        <button className="flex flex-col items-center text-xs text-neutral-500">
          <span></span>
          Favoritos
        </button>
        <button className="flex flex-col items-center text-xs text-neutral-500">
          <span></span>
          Login
        </button>
      </div>
    </>
  )
}