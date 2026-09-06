"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const router = useRouter();
  const [loginForm, setLoginForm] = useState(false)

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      router.push("/profile");
    } else {
      setError(result.message || "E-mail ou senha incorretos");
    }
  }
  async function handleRegisterSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) {
      router.push("/profile");
    } else {
      setError(result.message|| "Erro ao cadastrar");
    }
  }
  return (
    <div>
    <div className="relative w-full h-screen bg-white">
      <Image
        src="/img/mosaic.png"
        alt=""
        fill
        className="object-cover hidden sm:block"
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none hidden sm:block" />

      <div className="absolute inset-0 flex items-start justify-center sm:top-10 sm:items-center sm:bottom-10">
        <div className="w-full max-w-lg px-4 py-18 bg-white sm:shadow-xl sm:rounded-4xl">
          <form onSubmit={handleSubmit} className="space-y-1 text-center">
            <Image
              src="/img/logo.png"
              alt=""
              width={40}
              height={40}
              className="position-relative top-px inline-block"
            />
            <span className="block text-stone-700 text-3xl py-3">
              Entrar ou cadastrar-se
            </span>

            <input
              type="text"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 mt-4 block w-full rounded-xl py-4 px-5 border-neutral-300 text-md text-neutral-700 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 mt-3 block w-full rounded-xl py-4 px-5 border-neutral-300 text-md text-neutral-700 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
            />

            {error && (
              <p className="text-red-500 text-sm text-left mt-1">{error}</p>
            )}

            <span className="block text-neutral-600 text-sm text-left mt-2">
              Enviaremos um código de confirmação por mensagem de texto ou
              email. Sujeito a taxas de dados e mensagens.{" "}
              <Link className="text-neutral-600 underline" href="/sobre">
                Política de privacidade
              </Link>
            </span>

            <button
              type="submit"
              className="bg-linear-to-r from-red-500 via-rose-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl w-full mt-3"
            >
              Enviar
            </button>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 h-px bg-neutral-300" />
              <span className="text-neutral-500 text-sm">ou</span>
              <div className="flex-1 h-px bg-neutral-300" />
            </div>

            <div className="flex gap-3 justify-center mt-4">
              <div className="border-[1.5px] border-neutral-300 rounded-2xl p-3">
                <Image
                  src="/img/google-logo.webp"
                  alt=""
                  width={30}
                  height={40}
                  className="position-relative top-px inline-block"
                />
              </div>
              <div className="border-[1.5px] border-neutral-300 rounded-2xl p-3">
                <Image
                  src="/img/apple-logo.png"
                  alt=""
                  width={30}
                  height={40}
                  className="position-relative top-px inline-block"
                  
                />
                
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span>Ainda não possui uma conta?</span>
              <button type="button"onClick={() => setLoginForm(!loginForm)} className="flex items-center justify-center cursor-pointer hover:underline ">Criar uma</button>
              </div>
          </form>
        </div>
      </div>
    </div>
    {loginForm && (
      <div className="absolute inset-0 bg-black/40 ">
    <div className="relative w-full h-screen bg-white">
      <Image
        src="/img/mosaic.png"
        alt=""
        fill
        className="object-cover hidden sm:block"
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none hidden sm:block" />

      <div className="absolute inset-0 flex items-start justify-center sm:top-10 sm:items-center sm:bottom-10">
        <div className="w-full max-w-lg px-4 py-18 bg-white sm:shadow-xl sm:rounded-4xl">
          <form onSubmit={handleRegisterSubmit} className="space-y-1 text-center">
            <Image
              src="/img/logo.png"
              alt=""
              width={40}
              height={40}
              className="position-relative top-px inline-block"
            />
            <span className="block text-stone-700 text-3xl py-3">
            cadastrar-se
            </span>

            <input
              type="text"
              placeholder="Nome de usuário"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 mt-4 block w-full rounded-xl py-4 px-5 border-neutral-300 text-md text-neutral-700 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 mt-4 block w-full rounded-xl py-4 px-5 border-neutral-300 text-md text-neutral-700 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Digite uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 mt-3 block w-full rounded-xl py-4 px-5 border-neutral-300 text-md text-neutral-700 hover:border-neutral-400 focus:border-neutral-400 focus:outline-none"
            />

            {error && (
              <p className="text-red-500 text-sm text-left mt-1">{error}</p>
            )}

            <span className="block text-neutral-600 text-sm text-left mt-2">
              Enviaremos um código de confirmação por mensagem de texto ou
              email. Sujeito a taxas de dados e mensagens.{" "}
              <Link className="text-neutral-600 underline" href="/sobre">
                Política de privacidade
              </Link>
            </span>

            <button
              type="submit"
              className="bg-linear-to-r from-red-500 via-rose-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl w-full mt-3"
            >
              Enviar
            </button>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 h-px bg-neutral-300" />
              <span className="text-neutral-500 text-sm">ou</span>
              <div className="flex-1 h-px bg-neutral-300" />
            </div>

            <div className="flex gap-3 justify-center mt-4">
              <div className="border-[1.5px] border-neutral-300 rounded-2xl p-3">
                <Image
                  src="/img/google-logo.webp"
                  alt=""
                  width={30}
                  height={40}
                  className="position-relative top-px inline-block"
                />
              </div>
              <div className="border-[1.5px] border-neutral-300 rounded-2xl p-3">
                <Image
                  src="/img/apple-logo.png"
                  alt=""
                  width={30}
                  height={40}
                  className="position-relative top-px inline-block"
                />
              </div>
            </div>
            <button type="button" onClick={() => setLoginForm(!loginForm)} className="cursor-pointer hover:underline mt-4">Já tenho uma conta</button>
          </form>
        </div>
      </div>
    </div>
  </div>
      
    )}
    </div>
  );
}
