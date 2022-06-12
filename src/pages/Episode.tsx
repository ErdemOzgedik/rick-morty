import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Back from "../components/Back";
import Card from "../components/Card";
import SearchField from "../components/SearchField";

import { RootState } from "../redux/store";
import {
  getEpisodeAsync,
  getEpisodeCharacterAsync,
  searchCharacters,
  sortCharacters,
} from "../redux/episodeSlice";

function Episode() {
  const { id } = useParams<string>();
  const dispatch = useDispatch();
  const episode = useSelector((state: RootState) => state.episode);
  const [term, setTerm] = useState("");

  const handleSort = () => {
    dispatch(sortCharacters());
  };

  useEffect(() => {
    dispatch(searchCharacters(term));
  }, [dispatch, term]);

  useEffect(() => {
    if (id && id !== episode.response.id.toString()) {
      dispatch(getEpisodeAsync(id));
    }
  }, [dispatch, id, episode.response.id]);

  useEffect(() => {
    if (episode.characters.length === 0)
      episode.response.characters.map((url: string) => {
        let id = url.split("/")[url.split("/").length - 1];
        dispatch(getEpisodeCharacterAsync(id));

        return id;
      });
  }, [dispatch, episode.response.characters, episode.characters]);

  return (
    <div className="container m-auto flex flex-col shadow-2xl">
      <Back />

      <div className="m-auto flex flex-col mt-2 rounded-2xl w-4/5 sm:flex-row sm:justify-center sm:items-center">
        <div className="bg-black opacity-80 rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
          <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-white">
            IMAGE
          </div>
          <div className="mt-4">
            <h1 className="text-lg text-white font-semibold hover:underline cursor-pointer">
              {episode.response.name}
            </h1>
            <p className="mt-4 text-md text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              quam, provident maiores temporibus, doloremque doloribus iure
              molestiae dicta labore adipisci autem voluptatibus maxime. Ipsum,
              delectus tempora corrupti possimus necessitatibus nam?
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
          <SearchField term={term} setTerm={setTerm} />
          <div
            onClick={handleSort}
            className="w-full text-center bg-black opacity-80 rounded-lg text-yellow-400 p-4 cursor-pointer"
          >
            Sort by Name
          </div>
        </div>

        <div className="flex flex-row justify-around flex-wrap">
          {episode.searchedCharacters.map((character) => (
            <Card key={character.id} character={character}></Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Episode;
