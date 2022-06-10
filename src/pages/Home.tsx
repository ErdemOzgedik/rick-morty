import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

function Home() {
  const episodes = useSelector((state: RootState) => state.season);

  return (
    <section>
      <ul className="flex flex-row flex-wrap w-1/2 items-center m-auto mt-8">
        {episodes.response.results.map((episode) => (
          <Link
            className="border p-4 w-1/2 bg-slate-400 text-yellow-200"
            to={`/episode/${episode.id}`}
            key={episode.id}
          >
            {episode.name}
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default Home;
