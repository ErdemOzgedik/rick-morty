import React, { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateSeason } from "../redux/seasonSlice";
import { RootState } from "../redux/store";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const season = useSelector((state: RootState) => state.season);
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const id = (e.target as HTMLLIElement).dataset.id;

    if (id !== season.current) dispatch(updateSeason(id));
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 shadow-md bg-black opacity-80 hover:bg-yellow-400 hover:opacity-[1] transition-all duration-700 ease-in-out">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
              Rick & Morty Season {season.current} Episodes
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? <AiOutlineCloseCircle /> : <AiOutlineMenu />}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul
              className="flex flex-col lg:flex-row list-none lg:ml-auto"
              onClick={handleClick}
            >
              {Array.from(Array(5).keys()).map((index) => (
                <li
                  key={index}
                  data-id={index + 1}
                  className="px-3 cursor-pointer py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 transition-all duration-500 ease-in-out ml-3"
                >
                  Season {index + 1}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
