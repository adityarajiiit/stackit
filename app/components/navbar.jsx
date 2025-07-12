"use client";
import React from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Bell } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center p-2 bg-secondary-foreground">
      <Image src={logo} alt="logo" className="h-10 w-10"></Image>
      <ul className="flex gap-5 font-sans">
        <Link
          href="/"
          className={`font-medium font-mono text-lg ${pathname == "/" ? "text-primary border-b " : "text-secondary"}`}
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className={`font-medium font-mono text-lg ${pathname == "/dashboard" ? "text-primary border-b " : "text-secondary"}`}
        >
          Dashboard
        </Link>
        <Link
          href="/answers"
          className={`font-medium font-mono text-lg ${pathname == "/answers" ? "text-primary border-b " : "text-secondary"}`}
        >
          Answers
        </Link>

        <Link href="/notification" className="flex justify-center items-center">
          <Bell
            className={`h-6 w-6 ${pathname == "/notification" ? "stroke-primary" : "stroke-secondary"}`}
          />
        </Link>
      </ul>
      {session ? (
        <button
          className="p-2 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 rounded-sm font-sans text-sm mr-2"
          onClick={signOut}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="p-2 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 rounded-sm font-sans text-sm mr-2"
          onClick={signIn}
        >
          Sign In
        </button>
      )}
    </nav>
  );
}

export default Navbar;
