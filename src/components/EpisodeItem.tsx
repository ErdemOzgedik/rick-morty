import React from "react";
import { Link } from "react-router-dom";
import { Episode } from "../types/apitypes";

interface Props {
  episode: Episode;
}

function EpisodeItem({ episode }: Props) {
  return (
    <Link
      className="p-4 w-full text-white text-lg rounded-2xl shadow-2xl hover:opacity-[1] hover:bg-yellow-400 transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
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
  );
}

export default EpisodeItem;
