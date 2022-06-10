import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../api/instance";

function Home() {
  const getEpisodes = async () => {
    try {
      const response = await instance.get("episode");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEpisodes();
  }, []);

  return (
    <>
      <main>
        <h2 className="text-3xl font-bold underline">
          Welcome to the homepage!
        </h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/episode/1">Episode</Link>
        <Link to="/character/1">Character</Link>
      </nav>
    </>
  );
}

export default Home;
