import React, { useEffect } from "react";
import { RiAliensLine, RiEarthFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Back from "../components/Back";

import { getCharacterAsync } from "../redux/characterSlice";
import { RootState } from "../redux/store";
import { SPECIES_TYPES } from "../types/enum";

function Character() {
  const { id } = useParams<string>();
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);

  useEffect(() => {
    if (id) {
      dispatch(getCharacterAsync(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <section className="h-full lg:h-2/3 absolute inset-0 m-auto overflow-scroll lg:overflow-hidden text-white bg-transparent">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="character"
              className="lg:w-2/5 w-full bg-no-repeat bg-cover bg-center rounded-2xl lg:rounded-none lg:rounded-l-2xl"
              src={character.response.image}
            />
            <div className="lg:w-3/5 w-full lg:pl-10 lg:py-6 mt-6 p-4 lg:mt-0 bg-black opacity-80 rounded-2xl lg:rounded-none lg:rounded-r-2xl">
              <h2 className="text-sm title-font text-white tracking-widest">
                CHARACTER NAME
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-1">
                {character.response.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {character.response.species === SPECIES_TYPES.human ? (
                    <RiEarthFill />
                  ) : (
                    <RiAliensLine />
                  )}

                  <span className="text-white ml-3">
                    {character.response.species}
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  {character.response.gender}
                </span>
              </div>
              <p className="leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Placeat labore iure culpa vero eveniet totam, quasi distinctio
                quod laborum sit, cumque tempore quisquam. Sint explicabo nisi,
                totam eos fuga doloribus. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.Excepturi sapiente quaerat fuga
                pariatur commodi aspernatur asperiores dolorum illum, sed, id,
                aut mollitia provident corporis vitae consequatur necessitatibus
                expedita consequuntur blanditiis.
              </p>

              <div className="flex items-center mt-4">
                <span className="title-font font-medium text-2xl text-white">
                  <MdLocationOn />
                </span>
                <span className="title-font font-medium text-xl ml-3 text-white">
                  {character.response.location.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Back />
    </>
  );
}

export default Character;
