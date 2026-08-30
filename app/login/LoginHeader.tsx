import { Logo } from "../components/header/logo";
import { LanguageMenu } from "../components/header/languageMenu";
import { MenuButton } from "../components/header/menuFunctions";
import { BecomeAnHost } from "../components/header/becomeAnHost";

export default function LoginHeader() {
  return (
    <header className="flex flex-col gap-4 px-4 md:px-8 py-4 bg-white sm:bg-neutral-100 shadow-md">
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
  );
}