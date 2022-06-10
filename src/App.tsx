import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Character from "./pages/Character";
import Episode from "./pages/Episode";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <h1>Rick & morty!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="episode/:id" element={<Episode />} />
        <Route path="character/:id" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
