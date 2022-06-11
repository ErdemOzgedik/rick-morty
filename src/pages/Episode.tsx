import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Back from "../components/Back";
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
      <Back />
      <div className="m-auto flex flex-col mt-2 rounded-2xl w-4/5 sm:flex-row sm:justify-center sm:items-center">
        <div className="bg-black opacity-80 rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
          <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-white">
            LOGO
          </div>
          <div className="mt-4">
            <h1 className="text-lg text-white font-semibold hover:underline cursor-pointer">
              {episode.response.name}
            </h1>
            <p className="mt-4 text-md text-white">
              But I must explain to you how all this mistaken idea of denouncing
              pleasure and praising pain was born and I will give you a complete
              account of the system, and expound the actual teachings of the
              great explorer of the truth, the master-builder of human happines.
            </p>
            <div className="flex justify-between items-center">
              <div className="mt-4 flex items-center space-x-4 py-6">
                <div className="text-sm font-semibold text-white">
                  Created At •{" "}
                  <span className="font-normal">
                    {episode.response.created}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-auto flex flex-col w-4/5">
        <div className="mt-4 flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className="w-full bg-black p-4">sdas</div>
        </div>

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
