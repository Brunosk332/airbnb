'use client'
import { Logo } from "./logo"
import { NavigationBar } from "./navigationBar"
import { BecomeAnHost } from "./becomeAnHost"
import { LanguageMenu } from "./languageMenu"
import { MenuButton } from "./menu"
import { SearchBar } from "./searchbar"
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isPropertyPage = pathname.startsWith("/property");
  return (
    <header className="flex flex-col gap-4 px-4 md:px-8 py-4">
      {isPropertyPage ? (
        <>
 <div className="hidden sm:grid max-w-[1852px] mx-auto grid-cols-3 items-center w-full">
 <div className="flex justify-start">
   <Logo />
 </div>
 <div className="flex justify-center">
   <NavigationBar />
 </div>
 <div className="flex justify-end items-center gap-6">
   <div className="hidden xl:block">
     <BecomeAnHost />
   </div>
   <LanguageMenu />
   <MenuButton />
 </div>
</div>
<div className="hidden md:flex justify-center">
 <SearchBar />
</div>
<div className="flex md:hidden justify-center">
 {/*}  <SearchBarMobile /> nao esta pronto*/}
</div>
</>
      ) : (
        <>
      <div className="hidden sm:grid max-w-[1852px] mx-auto grid-cols-3 items-center w-full">
        <div className="flex justify-start">
          <Logo />
        </div>

        <div className="flex justify-center">
          <NavigationBar />
        </div>

        <div className="flex justify-end items-center gap-6">
          <div className="hidden xl:block">
            <BecomeAnHost />
          </div>
          <LanguageMenu />
          <MenuButton />
        </div>
      </div>

      <div className="hidden md:flex justify-center">
        <SearchBar />
      </div>
      <div className="flex md:hidden justify-center">
        {/*}  <SearchBarMobile /> nao esta pronto*/}
      </div>
      </>
      )};
    </header>
  );
}