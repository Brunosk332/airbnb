import Logo from "../components/components"
import { NavigationBar } from "../components/components"
import { HelpBar } from "../components/components"

export default function Page() {
    return (
        <header className="flex flex-row items-center justify-between px-6 py-4">
            <Logo />
            <NavigationBar />
            <HelpBar />
        </header>
    )
}