import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
    <div className="container m-auto flex flex-col shadow-2xl">
      <div className="m-auto flex flex-col h-64 rounded-2xl w-4/5 sm:flex-row bg-green-100 sm:justify-center sm:items-center">
        <div className="text-base sm:text-xl w-3/5">
          {episode.response.episode} - {episode.response.name}
        </div>
        <div className="text-sm flex-1 text-end">
          {episode.response.air_date}
        </div>
      </div>

      <div className="m-auto flex flex-col w-4/5">
        <div>search</div>
        <div className="flex flex-row justify-around flex-wrap">
          {episode.characters.map((character) => (
            <Card key={character.id} character={character}></Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Episode;
