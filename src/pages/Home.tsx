import React from "react";
import { useSelector } from "react-redux";
import EpisodeItem from "../components/EpisodeItem";

import Navbar from "../components/Navbar";

import { RootState } from "../redux/store";

function Home() {
  const season = useSelector((state: RootState) => state.season);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="items-center text-center justify-center p-6 text-white text-2xl">
        Season {season.current} Episodes
      </div>
      <ul className="flex flex-row flex-wrap container w-4/5 lg:w-3/5 xl:1/2 m-auto items-center border-4 py-4 rounded-2xl shadow-2xl bg-black opacity-80">
        {season.response.results.map((episode) => (
          <EpisodeItem key={episode.id} episode={episode} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
