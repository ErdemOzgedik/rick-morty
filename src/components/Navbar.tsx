import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const currentSeason = 1;
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 shadow-md hover:bg-yellow-400 transition-all duration-500 ease-in-out">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
              Rick & Morty Season {currentSeason} Episodes
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {Array.from(Array(5).keys()).map((i) => (
                <li key={i}>
                  <div className="px-3 cursor-pointer py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 transition-all duration-500 ease-in-out">
                    <span className="ml-2">Season {i + 1}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
