import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
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
