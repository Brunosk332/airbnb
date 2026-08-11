import { Logo } from "../components"
import { NavigationBar } from "../components"
import { BecomeAnHost } from "../components"
import { LanguageAndRegion } from "../components"
import { HelpBar } from "../components"
import { SearchBar } from "./searchbar"

export default function Header() {
    return (
      <header className="flex flex-col gap-4 px-4 md:px-8 py-4">
        <div className="hidden md:flex items-center justify-between w-full ">
          <Logo />
          <NavigationBar />
          <div className="flex items-center gap-6">
            <div className="hidden lg:block m-8">
              <BecomeAnHost />
            </div>
            <LanguageAndRegion />
            <HelpBar />
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