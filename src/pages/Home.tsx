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
      <div className="items-center text-center justify-center p-6 text-white text-2xl">
        Season 1 Episodes
      </div>
      <ul className="flex flex-row flex-wrap container w-4/5 lg:w-3/5 xl:1/2 m-auto items-center border-4 py-4 rounded-2xl shadow-2xl">
        {episodes.response.results.map((episode) => (
          <Link
            className="p-4 w-full bg-transparent text-white text-lg rounded-2xl shadow-2xl hover:bg-yellow-400 transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            to={`/episode/${episode.id}`}
            key={episode.id}
          >
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center">
              <div className="text-base sm:text-xl w-3/5">
                {episode.episode} - {episode.name}
              </div>
              <div className="text-sm flex-1 text-end">{episode.air_date}</div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Home;
