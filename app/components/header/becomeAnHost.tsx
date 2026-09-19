"use client"
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
export function BecomeAnHost() {
  const { user } = useAuth();
    return (

      <div className="hidden lg:flex flex-row items-center justify-center px-8 w-full">
              { !user && (
        <div className="flex flex-row items-center justify-center">
          <Link href="/login" className="text-base font-bold text-gray-900 whitespace-nowrap">
            Torne-se um anfitrião
            </Link>
        </div>
              )}
      </div>

    );
  }