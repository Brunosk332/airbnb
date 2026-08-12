export function MenuButton() {
   //const [MenuOpen, setMenuOpen] = useState(false);
   // 
   // 
   //  
    return (
      <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 
  hover:bg-gray-300 transition cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" d="M4 6h16"></path>
          <path strokeLinecap="round" d="M4 12h16"></path>
          <path strokeLinecap="round" d="M4 18h16"></path>
        </svg>
      </button>
    );
  }

