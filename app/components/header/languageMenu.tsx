'use client'
import { useState, useRef, useEffect } from "react";

export function LanguageMenu() {
    const [MenuOpen, setLanguageMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("idioma");

    useEffect(() => {
        function closeLanguageMenu(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setLanguageMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", closeLanguageMenu);
        return () => {
            document.removeEventListener("mousedown", closeLanguageMenu);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative flex items-center">
            <button onClick={() => setLanguageMenuOpen(!MenuOpen)} className="hover:bg-gray-100 flex items-center justify-center gap-3 bg-gray-200 w-10 h-10 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-5 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                >
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M3 12h18"></path>
                    <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"></path>
                </svg>
            </button>

            {MenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto">

                    {/* CARD ÚNICO - tudo dentro dele, na ordem certa */}
                    <div className="w-full max-w-4xl mt-10 mb-10 p-8 bg-white rounded-2xl text-sm text-gray-900">

                        {/* 1. Botão X */}
                        <button onClick={() => setLanguageMenuOpen(false)} className="mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* 2. Abas */}
                        <div className="border-b border-gray-200 flex gap-8 mb-6">
                            <button
                                onClick={() => setActiveTab("idioma")}
                                className={`pb-3 font-semibold ${activeTab === "idioma"
                                        ? "text-gray-900 border-b-2 border-gray-900"
                                        : "text-gray-500"
                                    }`}
                            >
                                Idioma e região
                            </button>
                            <button
                                onClick={() => setActiveTab("moeda")}
                                className={`pb-3 font-semibold ${activeTab === "moeda"
                                        ? "text-gray-900 border-b-2 border-gray-900"
                                        : "text-gray-500"
                                    }`}
                            >
                                Moeda
                            </button>
                        </div>

                        {activeTab === "idioma" && (
                            <>
                                {/* 3. Card Tradução */}
                                <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center mb-8">
                                    <div>
                                        <span className="font-semibold">Tradução</span>
                                        <p className="text-gray-500 text-sm">Traduza automaticamente as descrições e as avaliações para Português.</p>
                                    </div>
                                    <div className="w-11 h-6 bg-gray-400 rounded-full relative cursor-pointer">
                                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                                    </div>
                                </div>

                                {/* 4. Sugeridos */}
                                <h3 className="text-2xl font-semibold mb-4">Idiomas e regiões sugeridos</h3>
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <button className="text-left">
                                        <span className="font-semibold block">English</span>
                                        <span className="text-gray-500 text-sm">United States</span>
                                    </button>
                                    <button className="text-left">
                                        <span className="font-semibold block">English</span>
                                        <span className="text-gray-500 text-sm">United Kingdom</span>
                                    </button>
                                </div>

                                {/* 5. Título + grid completo */}
                                <h3 className="text-2xl font-semibold mb-4">Escolha um idioma e uma região</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left border border-gray-900">
                                        <span className="font-semibold text-gray-900 block">Português</span>
                                        <span className="text-gray-500 text-sm">Brasil</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Azərbaycan dili</span>
                                        <span className="text-gray-500 text-sm">Azərbaycan</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Bahasa Indonesia</span>
                                        <span className="text-gray-500 text-sm">Indonesia</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Bosanski</span>
                                        <span className="text-gray-500 text-sm">Bosna i Hercegovina</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Català</span>
                                        <span className="text-gray-500 text-sm">Espanya</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Čeština</span>
                                        <span className="text-gray-500 text-sm">Česká republika</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Crnogorski</span>
                                        <span className="text-gray-500 text-sm">Crna Gora</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Dansk</span>
                                        <span className="text-gray-500 text-sm">Danmark</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Deutsch</span>
                                        <span className="text-gray-500 text-sm">Deutschland</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Deutsch</span>
                                        <span className="text-gray-500 text-sm">Österreich</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Deutsch</span>
                                        <span className="text-gray-500 text-sm">Schweiz</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Deutsch</span>
                                        <span className="text-gray-500 text-sm">Luxemburg</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Eesti</span>
                                        <span className="text-gray-500 text-sm">Eesti</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">United States</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">United Kingdom</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">Australia</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">Canada</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">Guyana</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">India</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">Ireland</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">New Zealand</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">Singapore</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">English</span>
                                        <span className="text-gray-500 text-sm">United Arab Emirates</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Argentina</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Belice</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Bolivia</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Chile</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Colombia</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Costa Rica</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Ecuador</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">El Salvador</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">España</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Estados Unidos</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Guatemala</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Honduras</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Latinoamérica</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">México</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Nicaragua</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Panamá</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Paraguay</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Perú</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Español</span>
                                        <span className="text-gray-500 text-sm">Venezuela</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Français</span>
                                        <span className="text-gray-500 text-sm">Belgique</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Français</span>
                                        <span className="text-gray-500 text-sm">Canada</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Français</span>
                                        <span className="text-gray-500 text-sm">France</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Français</span>
                                        <span className="text-gray-500 text-sm">Suisse</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Français</span>
                                        <span className="text-gray-500 text-sm">Luxembourg</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Gaeilge</span>
                                        <span className="text-gray-500 text-sm">Éire</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Hrvatski</span>
                                        <span className="text-gray-500 text-sm">Hrvatska</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">isiXhosa</span>
                                        <span className="text-gray-500 text-sm">eMzantsi Afrika</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">isiZulu</span>
                                        <span className="text-gray-500 text-sm">iNingizimu Afrika</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Íslenska</span>
                                        <span className="text-gray-500 text-sm">Ísland</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Italiano</span>
                                        <span className="text-gray-500 text-sm">Italia</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Italiano</span>
                                        <span className="text-gray-500 text-sm">Svizzera</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Kiswahili</span>
                                        <span className="text-gray-500 text-sm">Āfrika</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Latviešu</span>
                                        <span className="text-gray-500 text-sm">Latvija</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Lietuvių</span>
                                        <span className="text-gray-500 text-sm">Lietuva</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Magyar</span>
                                        <span className="text-gray-500 text-sm">Magyarország</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Malti</span>
                                        <span className="text-gray-500 text-sm">Malta</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Melayu</span>
                                        <span className="text-gray-500 text-sm">Malaysia</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Vlaams</span>
                                        <span className="text-gray-500 text-sm">België</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Nederlands</span>
                                        <span className="text-gray-500 text-sm">Nederland</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Norsk</span>
                                        <span className="text-gray-500 text-sm">Norge</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Polski</span>
                                        <span className="text-gray-500 text-sm">Polska</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Português</span>
                                        <span className="text-gray-500 text-sm">Portugal</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Română</span>
                                        <span className="text-gray-500 text-sm">România</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Shqip</span>
                                        <span className="text-gray-500 text-sm">Shqipëri</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Slovenčina</span>
                                        <span className="text-gray-500 text-sm">Slovensko</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Slovenščina</span>
                                        <span className="text-gray-500 text-sm">Slovenija</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Srpski</span>
                                        <span className="text-gray-500 text-sm">Srbija</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Suomi</span>
                                        <span className="text-gray-500 text-sm">Suomi</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Svenska</span>
                                        <span className="text-gray-500 text-sm">Sverige</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Tagalog</span>
                                        <span className="text-gray-500 text-sm">Pilipinas</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Tiếng Việt</span>
                                        <span className="text-gray-500 text-sm">Việt Nam</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Türkçe</span>
                                        <span className="text-gray-500 text-sm">Türkiye</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Ελληνικά</span>
                                        <span className="text-gray-500 text-sm">Ελλάδα</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Български</span>
                                        <span className="text-gray-500 text-sm">България</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Македонски</span>
                                        <span className="text-gray-500 text-sm">Северна Македонија</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Русский</span>
                                        <span className="text-gray-500 text-sm">Россия</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Українська</span>
                                        <span className="text-gray-500 text-sm">Україна</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">ქართული</span>
                                        <span className="text-gray-500 text-sm">საქართველო</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">Հայերեն</span>
                                        <span className="text-gray-500 text-sm">Հայաստան</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">עברית</span>
                                        <span className="text-gray-500 text-sm">ישראל</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">العربية</span>
                                        <span className="text-gray-500 text-sm">العالم</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">हिन्दी</span>
                                        <span className="text-gray-500 text-sm">भारत</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">ಕನ್ನಡ</span>
                                        <span className="text-gray-500 text-sm">ಭಾರತ</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">मराठी</span>
                                        <span className="text-gray-500 text-sm">भारत</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">ไทย</span>
                                        <span className="text-gray-500 text-sm">ประเทศไทย</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">한국어</span>
                                        <span className="text-gray-500 text-sm">대한민국</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">日本語</span>
                                        <span className="text-gray-500 text-sm">日本</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">简体中文</span>
                                        <span className="text-gray-500 text-sm">美国</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">繁體中文</span>
                                        <span className="text-gray-500 text-sm">美國</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">简体中文</span>
                                        <span className="text-gray-500 text-sm">中国</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">繁體中文</span>
                                        <span className="text-gray-500 text-sm">香港</span>
                                    </button>
                                    <button className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition text-left">
                                        <span className="font-semibold text-gray-900 block">繁體中文</span>
                                        <span className="text-gray-500 text-sm">台灣</span>
                                    </button>
                                </div>
                            </>
                        )}

                        {activeTab === "moeda" && (
                            <div>
                                {/* conteúdo de moeda entra aqui depois */}
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    )
};