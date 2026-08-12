import { Logo } from "../components"
import { NavigationBar } from "../components"
import { BecomeAnHost } from "../components"
import { LanguageAndRegion } from "../components"
import { MenuButton } from "./menuFunctions"
import { SearchBar } from "./searchbar"

export default function Header() {
  return (
    <header className="flex flex-col gap-4 px-4 md:px-8 py-4">
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
          <LanguageAndRegion />
          <MenuButton />
        </div>
      </div>

      <div className="hidden md:flex justify-center">
        <SearchBar />
      </div>
      <div className="flex md:hidden justify-center">
        {/*}  <SearchBarMobile /> nao esta pronto*/}
      </div>
    </header>
  );
}