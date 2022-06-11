import React from "react";
import { Link } from "react-router-dom";
import { Character } from "../types/apitypes";

interface Props {
  character: Character;
}

const Card = ({ character }: Props) => {
  return (
    <Link to={`/character/${character.id}`}>
      <div className="bg-white hover:bg-yellow-400 shadow-xl hover:text-white cursor-pointer w-80 rounded-3xl flex flex-col mt-4 items-center justify-center transition-all duration-500 ease-in-out">
        <div className="relative mt-2 mx-2">
          <div className="h-56 rounded-2xl overflow-hidden">
            <img
              src={character.image}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>
        <div className="pt-10 pb-6 w-full px-4">
          <h1 className="font-medium leading-none text-base tracking-wider text-gray-400">{`${character.name}`}</h1>
        </div>
      </div>
    </Link>
  );
};

export default Card;
