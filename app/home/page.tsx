import Header from "../components/header/header"
export default function Page() {
    return (
        <div>
        <header className="bg-neutral-100 border-2 border-neutral-200 shadow-sm">
            <Header />
        </header>
        <div className="bg-white w-full h-screen"></div>
        </div>
    )
}