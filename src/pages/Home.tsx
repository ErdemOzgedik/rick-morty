import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { RootState } from "../redux/store";

function Home() {
  const episodes = useSelector((state: RootState) => state.season);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="h-1/2 w-full items-center text-center justify-center p-4 text-white">
        Rick & Morty Episodes
      </div>
      <ul className="flex flex-row flex-wrap w-1/2 items-center m-auto border-4 border-bermuda p-4 rounded-2xl shadow-2xl">
        {episodes.response.results.map((episode) => (
          <Link
            className="p-4 w-full bg-transparent text-white text-lg rounded-2xl shadow-2xl hover:bg-yellow hover:text-bermuda transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            to={`/episode/${episode.id}`}
            key={episode.id}
          >
            {episode.episode} - {episode.name} - {episode.air_date}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Home;
