import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEpisodesAsync } from "../redux/episodeSlice";
import { RootState } from "../redux/store";

function Home() {
  const dispatch = useDispatch();
  const episodes = useSelector((state: RootState) => state.episodes);

  useEffect(() => {
    dispatch(getEpisodesAsync());
  }, [dispatch]);

  console.log(episodes);

  return (
    <>
      <main>
        <h2 className="text-3xl font-bold underline">
          Welcome to the homepage!
        </h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav className="mt-4 border-4 flex justify-around">
        <Link to="/episode/1">Episode</Link>
        <Link to="/character/1">Character</Link>
      </nav>
      <section>
        <ul className="flex flex-col mt-8 w-96 m-auto">
          {episodes.response.results.map((episode) => (
            <Link
              className="border p-4"
              to={`/episode/${episode.id}`}
              key={episode.id}
            >
              {episode.name}
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Home;
