import { Logo } from "../header/logo";
import { BecomeAnHost } from "../header/becomeAnHost";
import { MenuButton } from "./menuLogout";
export default function LogoutHeader() {
  return (
    <header className="flex flex-col gap-4 px-4 md:px-8 py-4 bg-white sm:bg-neutral-100">
      <div className="hidden sm:grid max-w-[1852px] mx-auto grid-cols-2 items-center w-full">
        <div className="flex justify-start">
          <Logo />
        </div>
        <div className="flex justify-end items-center gap-6">
          <div>
            <BecomeAnHost />
          </div>
          <MenuButton />
        </div>
      </div>
    </header>
  );
}