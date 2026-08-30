import Grid from "./components/home-list/grid"
import Header from "./components/header/header"
import FooterFull from "./components/footer/footer"
import { Footer } from "./components/footer/footer"
import TravelInspiration from "./components/footer/travels"

async function getProperties() {
  const res = await fetch("http://localhost:3000/api/properties", { cache: "no-store" });
  return res.json();
}

export default async function Page() {
  const properties = await getProperties();

  return (
    <div>
      <header className="bg-neutral-100 border-2 border-neutral-200 shadow-sm">
        <Header />
      </header>
      <div>
        <Grid properties={properties} />
      </div>
      <footer>
        <div>
          <TravelInspiration />
        </div>
        <div>
          <FooterFull />
        </div>
        <div>
          <Footer />
        </div>
      </footer>
    </div>
  );
}