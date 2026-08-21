import Link from "next/link";

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