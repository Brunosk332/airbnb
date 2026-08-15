'use client'
import { useState, useRef, useEffect } from "react"; // ← tudo importado junto, no topo
import Image from "next/image";
export function languageMenu() {
  const [MenuOpen, setLanguageMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // 
  // 
  //  
  return (
      <div ref={menuRef} className="relative flex items-center">
        <button onClick={() => setLanguageMenuOpen(!MenuOpen)} className="flex items-center justify-center
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition border border-gray-900">
    <span className="font-semibold text-gray-900 block">Português</span>
    <span className="text-gray-500 text-sm">Brasil</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Azərbaycan dili</span>
    <span className="text-gray-500 text-sm">Azərbaycan</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Bahasa Indonesia</span>
    <span className="text-gray-500 text-sm">Indonesia</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Bosanski</span>
    <span className="text-gray-500 text-sm">Bosna i Hercegovina</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Català</span>
    <span className="text-gray-500 text-sm">Espanya</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Čeština</span>
    <span className="text-gray-500 text-sm">Česká republika</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Crnogorski</span>
    <span className="text-gray-500 text-sm">Crna Gora</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Dansk</span>
    <span className="text-gray-500 text-sm">Danmark</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Deutsch</span>
    <span className="text-gray-500 text-sm">Deutschland</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Deutsch</span>
    <span className="text-gray-500 text-sm">Österreich</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Deutsch</span>
    <span className="text-gray-500 text-sm">Schweiz</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Deutsch</span>
    <span className="text-gray-500 text-sm">Luxemburg</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Eesti</span>
    <span className="text-gray-500 text-sm">Eesti</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">United States</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">United Kingdom</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">Australia</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">Canada</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">Guyana</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">India</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">Ireland</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">New Zealand</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">Singapore</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">English</span>
    <span className="text-gray-500 text-sm">United Arab Emirates</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Argentina</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Belice</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Bolivia</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Chile</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Colombia</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Costa Rica</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Ecuador</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">El Salvador</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">España</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Estados Unidos</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Guatemala</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Honduras</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Latinoamérica</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">México</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Nicaragua</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Panamá</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Paraguay</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Perú</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Español</span>
    <span className="text-gray-500 text-sm">Venezuela</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Français</span>
    <span className="text-gray-500 text-sm">Belgique</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Français</span>
    <span className="text-gray-500 text-sm">Canada</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Français</span>
    <span className="text-gray-500 text-sm">France</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Français</span>
    <span className="text-gray-500 text-sm">Suisse</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Français</span>
    <span className="text-gray-500 text-sm">Luxembourg</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Gaeilge</span>
    <span className="text-gray-500 text-sm">Éire</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Hrvatski</span>
    <span className="text-gray-500 text-sm">Hrvatska</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">isiXhosa</span>
    <span className="text-gray-500 text-sm">eMzantsi Afrika</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">isiZulu</span>
    <span className="text-gray-500 text-sm">iNingizimu Afrika</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Íslenska</span>
    <span className="text-gray-500 text-sm">Ísland</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Italiano</span>
    <span className="text-gray-500 text-sm">Italia</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Italiano</span>
    <span className="text-gray-500 text-sm">Svizzera</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Kiswahili</span>
    <span className="text-gray-500 text-sm">Āfrika</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Latviešu</span>
    <span className="text-gray-500 text-sm">Latvija</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Lietuvių</span>
    <span className="text-gray-500 text-sm">Lietuva</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Magyar</span>
    <span className="text-gray-500 text-sm">Magyarország</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Malti</span>
    <span className="text-gray-500 text-sm">Malta</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Melayu</span>
    <span className="text-gray-500 text-sm">Malaysia</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Vlaams</span>
    <span className="text-gray-500 text-sm">België</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Nederlands</span>
    <span className="text-gray-500 text-sm">Nederland</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Norsk</span>
    <span className="text-gray-500 text-sm">Norge</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Polski</span>
    <span className="text-gray-500 text-sm">Polska</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Português</span>
    <span className="text-gray-500 text-sm">Portugal</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Română</span>
    <span className="text-gray-500 text-sm">România</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Shqip</span>
    <span className="text-gray-500 text-sm">Shqipëri</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Slovenčina</span>
    <span className="text-gray-500 text-sm">Slovensko</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Slovenščina</span>
    <span className="text-gray-500 text-sm">Slovenija</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Srpski</span>
    <span className="text-gray-500 text-sm">Srbija</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Suomi</span>
    <span className="text-gray-500 text-sm">Suomi</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Svenska</span>
    <span className="text-gray-500 text-sm">Sverige</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Tagalog</span>
    <span className="text-gray-500 text-sm">Pilipinas</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Tiếng Việt</span>
    <span className="text-gray-500 text-sm">Việt Nam</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Türkçe</span>
    <span className="text-gray-500 text-sm">Türkiye</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Ελληνικά</span>
    <span className="text-gray-500 text-sm">Ελλάδα</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Български</span>
    <span className="text-gray-500 text-sm">България</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Македонски</span>
    <span className="text-gray-500 text-sm">Северна Македонија</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Русский</span>
    <span className="text-gray-500 text-sm">Россия</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Українська</span>
    <span className="text-gray-500 text-sm">Україна</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">ქართული</span>
    <span className="text-gray-500 text-sm">საქართველო</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">Հայերեն</span>
    <span className="text-gray-500 text-sm">Հայաստան</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">עברית</span>
    <span className="text-gray-500 text-sm">ישראל</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">العربية</span>
    <span className="text-gray-500 text-sm">العالم</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">हिन्दी</span>
    <span className="text-gray-500 text-sm">भारत</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">ಕನ್ನಡ</span>
    <span className="text-gray-500 text-sm">ಭಾರತ</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">मराठी</span>
    <span className="text-gray-500 text-sm">भारत</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">ไทย</span>
    <span className="text-gray-500 text-sm">ประเทศไทย</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">한국어</span>
    <span className="text-gray-500 text-sm">대한민국</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">日本語</span>
    <span className="text-gray-500 text-sm">日本</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">简体中文</span>
    <span className="text-gray-500 text-sm">美国</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">繁體中文</span>
    <span className="text-gray-500 text-sm">美國</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">简体中文</span>
    <span className="text-gray-500 text-sm">中国</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">繁體中文</span>
    <span className="text-gray-500 text-sm">香港</span>
  </div>
  <div className="cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition">
    <span className="font-semibold text-gray-900 block">繁體中文</span>
    <span className="text-gray-500 text-sm">台灣</span>
  </div>
</div>
          </div >
        )};