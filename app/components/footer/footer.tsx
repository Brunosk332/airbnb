import Link from "next/link";
  export default function FooterFull() {
    
const columns = [
    {
      title: "Atendimento",
      links: [
        "Central de Ajuda",
        "Receber ajuda com problema de segurança",
        "AirCover",
        "Antidiscriminação",
        "Apoio à pessoa com deficiência",
        "Opções de cancelamento",
        "Reporte um problema no bairro",
      ],
    },
    {
      title: "Hospedagem",
      links: [
        "Anuncie seu espaço no Airbnb",
        "Anuncie sua experiência no Airbnb",
        "Anuncie seu serviço no Airbnb",
        "AirCover para anfitriões",
        "Recursos para anfitriões",
        "Fórum da comunidade",
        "Hospedagem responsável",
        "Participe de uma aula gratuita sobre hospedagem",
        "Encontre um coanfitrião",
        "Indique um anfitrião",
      ],
    },
    {
      title: "Airbnb",
      links: [
        "Airbnb 2026 - edição de maio",
        "Newsroom",
        "Carreiras",
        "Investidores",
        "Locais emergenciais Airbnb.org",
      ],
    },
  ];
  
    return (
      <footer className="bg-neutral-50 border-t text-neutral-500">
        <div className="max-w-[1852px] mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold mb-4">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link} className="text-sm text-neutral-700 hover:underline cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
  
        <div className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
            <p>
              © 2026 Airbnb, Inc. · Privacidade · Termos · Informações da empresa
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">Português (BR)</span>
              <span>R$ BRL</span>
              <div className="flex items-center gap-4">
                <span>Facebook</span>
                <span>X</span>
                <span>Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

export function Footer() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 flex 
    justify-around items-center py-8 sm:hidden z-50">
            <Link href="home" className="flex flex-col items-center text-xs text-neutral-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Explorar
            </Link>
            <Link href="/favoritos" className="flex flex-col items-center text-xs text-neutral-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s-6.7-4.35-9.3-8.1C1 10.1 1.6 6.6 4.6 5.1c2.3-1.15 4.6-.3 5.9 1.4L12 8l1.5-1.5c1.3-1.7 3.6-2.55 5.9-1.4 3 1.5 3.6 5 1.9 7.8C18.7 16.65 12 21 12 21z" />
                </svg>
                Favoritos
            </Link>
            <Link href="/login" className="flex flex-col items-center text-xs text-neutral-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M6.5 19c1-2.5 3-4 5.5-4s4.5 1.5 5.5 4" />
                </svg>
                Login
            </Link>
        </div>
    )
}