import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getEpisodeAsync } from "../redux/episodeSlice";
import { RootState } from "../redux/store";

function Episode() {
  const { id } = useParams<string>();
  const dispatch = useDispatch();
  const episode = useSelector((state: RootState) => state.episode);

  useEffect(() => {
    if (id) {
      dispatch(getEpisodeAsync(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <main>
        <h2>Episode id {id}!!!</h2>
        <p>{episode.response.name}</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <section>
        <ul className="flex flex-row flex-wrap w-1/2 items-center m-auto mt-8">
          {episode.response.characters.map((character) => (
            <Link
              className="border p-4 w-1/2 bg-slate-400 text-yellow-200"
              to={`/character/${
                character.split("/")[character.split("/").length - 1]
              }`}
              key={character}
            >
              {character}
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Episode;
