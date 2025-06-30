'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className="w-screen px-20 h-20 flex items-center justify-between text-xl bg-[#fdfdff]">
      <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
        <Link href="/">Blog</Link>
      </div>
      <div className=""></div>
      <div className="flex gap-10 justify-between">
        <div className="font-medium text-slate-700 hover:text-slate-900 transition-colors">
          <Link href="/">Home</Link>
        </div>
        <div className="font-medium text-slate-700 hover:text-slate-900 transition-colors">
          <Link href="/posts">Explore</Link>
        </div>
      </div>
      <div className=""></div>
      <div className="flex justify-between gap-10">
        <Link href="/create">
          <div className="font-medium text-slate-700 hover:text-slate-900 transition-colors">Write</div>
        </Link>
        <Link href={isLoggedIn ? "/admin" : "/login"}>
          <div
            id="login"
            className={`font-medium transition-colors ${
              isLoggedIn ? "text-slate-700 hover:text-slate-900" : "text-blue-500 hover:text-blue-700"
            }`}
          >
            {isLoggedIn ? "Admin" : "Log In"}
          </div>
        </Link>
      </div>
    </div>
  );
}