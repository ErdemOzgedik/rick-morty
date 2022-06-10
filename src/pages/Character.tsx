import React from "react";
import { Link } from "react-router-dom";

function Character() {
  return (
    <>
      <main>
        <h2>Character Page!!!</h2>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default Character;
