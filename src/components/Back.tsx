import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Back() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div
      onClick={handleClick}
      className="flex opacity-80 cursor-pointer inset-x-1 inset-y-4 lg:rounded-full lg:absolute lg:inset-16 w-full h-12 lg:w-16 lg:h-16 text-3xl bg-white lg;rounded-full text-center justify-center items-center hover:bg-black hover:text-yellow-400 hover:opacity-[1] transition-all duration-300 ease-in-out"
    >
      <BiArrowBack />
    </div>
  );
}

export default Back;
