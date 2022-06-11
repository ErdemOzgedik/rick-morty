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
      className="absolute flex opacity-80 cursor-pointer inset-24 w-16 h-16 text-4xl bg-white rounded-full text-center justify-center items-center hover:bg-black hover:text-yellow-400 hover:opacity-[1] transition-all duration-300 ease-in-out"
    >
      <BiArrowBack />
    </div>
  );
}

export default Back;
