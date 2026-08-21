import Link from "next/link";
export function BecomeAnHost() {
    return (
      <div className="hidden lg:flex flex-row items-center justify-center px-8 w-full">
        <div className="flex flex-row items-center justify-center">
          <Link href="/login" className="text-base font-bold text-gray-900 whitespace-nowrap">
            Torne-se um anfitrião
            </Link>
        </div>
      </div>
    );
  }