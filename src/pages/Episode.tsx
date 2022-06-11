import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import {
  getEpisodeAsync,
  getEpisodeCharacterAsync,
  resetEpisodeState,
} from "../redux/episodeSlice";
import { RootState } from "../redux/store";

function Episode() {
  const { id } = useParams<string>();
  const dispatch = useDispatch();
  const episode = useSelector((state: RootState) => state.episode);

  useEffect(() => {
    if (id) {
      dispatch(getEpisodeAsync(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    episode.response.characters.map((url: string) => {
      let id = url.split("/")[url.split("/").length - 1];
      dispatch(getEpisodeCharacterAsync(id));

      return id;
    });
  }, [dispatch, episode.response.characters]);

  useEffect(() => {
    return () => {
      dispatch(resetEpisodeState());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div>ERDEM</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
        {episode.characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

export default Episode;
