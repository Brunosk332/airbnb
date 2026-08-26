import { gridFake } from "../components/GridFake"
import Card from "../components/home-list/card"
import Grid from "../components/home-list/grid"
import Header from "../components/header/header"
export default function Page() {
    return (
        <div>
        <header className="bg-neutral-100 border-2 border-neutral-200 shadow-sm">
            <Header />
        </header>
<Grid properties={gridFake}/>
        </div>
    )
}