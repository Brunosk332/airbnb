import { usePathname } from "next/navigation";





export function SearchBar() {
  const pathname = usePathname();
  const isPropertyPage = pathname.startsWith("/property");
    return (
      <div className="flex items-center border rounded-full shadow-md hover:shadow-md transition w-fit mx-auto">
        {isPropertyPage ? (
       null ) : (
          <>
        <div className="flex flex-col px-20 py-3 cursor-pointer rounded-full hover:bg-gray-300">
          <span className="text-sm font-bold text-gray-900">Onde</span>
          <span className="text-base text-gray-500">Buscar destinos</span>
        </div>
  
        <div className="h-8 w-px bg-gray-300"></div>
  
        <div className="flex flex-col px-20 py-3 cursor-pointer rounded-full hover:bg-gray-300">
          <span className="text-sm font-bold text-gray-900">Quando</span>
          <span className="text-base text-gray-500">Insira as datas</span>
        </div>
  
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex flex-col pl-18 pr-24 py-3 cursor-pointer hover:bg-gray-300 rounded-full transition">
  <span className="text-sm font-bold text-gray-900">Quem</span>
  <span className="text-base text-gray-500">Hóspedes?</span>
</div>

<button className="flex items-center justify-center w-14 h-14 bg-red-500 rounded-full hover:bg-red-600 transition -ml-14">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
    ></path>
  </svg>
</button>
</>
        )}
      </div>
    );
  }
  export function SearchBarMobile() {
    return (
      <div className="flex md:hidden items-center gap-2 border rounded-full shadow-sm px-4 py-3 mx-4">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <span className="font-semibold">Inicie sua busca</span>
      </div>
    );
  }