import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Character from "./pages/Character";
import Episode from "./pages/Episode";
import Home from "./pages/Home";
import { getSeasonAsync } from "./redux/seasonSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeasonAsync("1"));
  }, [dispatch]);

  return (
    <div className="bg-bg-asset bg-no-repeat bg-cover bg-center h-screen w-screen overflow-scroll">
      <div className="flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="episode/:id" element={<Episode />} />
          <Route path="character/:id" element={<Character />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
