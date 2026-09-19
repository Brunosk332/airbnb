"use client"
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
export default function ProfileButton() {
  const { user } = useAuth();
  const initial = user?.name?.charAt(0).toUpperCase();
  return (

<div className="flex items-center gap-3 pr-4">
{user && (
  <Link
    href="/profile"
    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold 
text-neutral-700"
  >
    {initial}
  </Link>
)}
</div>
  )
}