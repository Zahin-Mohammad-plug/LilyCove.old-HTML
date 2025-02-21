"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="fixed w-full z-10 top-0 bg-[#7161a8]">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-2 m-2 relative">
        {/* Logo Section */}
        <div className="flex items-start text-left">
          <Link
            href="/"
            className="text-[#ddd8b8] text-left text-lg font-bold no-underline hover:no-underline transition duration-200 ease-in-out transform hover:scale-105"
          >
            LilyCove
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-1 items-center justify-center font-normal">
          <input
            type="search"
            placeholder="Search for cards, sets, TCG"
            className="text-sm px-2 py-1.5 rounded-lg bg-[#D9D9D91A] text-white placeholder-[#fffcfc] placeholder-opacity-70 border-none w-2/3 md:max-w-sm pb-0.5 transition focus:ring focus:ring-[#64ffda] focus:ring-opacity-25"
          />
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex items-center px-3 py-2 justify-between text-white focus:outline-none transition duration-200 ease-in-out transform hover:scale-110"
          >
            <svg
              className="fill-current h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isNavOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 font-medium`}
        >
          {/* Collapsed Menu */}
          <ul className="flex flex-col lg:flex-row lg:justify-end md:items-end gap-4 lg:gap-6 text-white text-sm lg:text-base">
            <li className="border-t lg:border-t-0 border-gray-500 py-2 lg:py-0 font-medium transition hover:text-[#64ffda]">
              <Link href="/" className="inline-block px-4">
                Home
              </Link>
            </li>
            <li className="border-t lg:border-t-0 border-gray-500 py-2 lg:py-0 font-medium transition hover:text-[#64ffda]">
              <Link href="/series" className="inline-block px-4">
                Pokemon
              </Link>
            </li>
          </ul>

          {/* Collapsed Search Bar */}
          <div className="w-full mt-2 md:hidden">
            <input
              type="text"
              placeholder="Search for cards, sets, TCG"
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D91A] text-white placeholder-[#fffcfc] placeholder-opacity-70 border-none transition focus:ring focus:ring-[#64ffda] focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
