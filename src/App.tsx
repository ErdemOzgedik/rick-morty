import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Character from "./pages/Character";
import Episode from "./pages/Episode";
import Home from "./pages/Home";
import { getSeasonAsync } from "./redux/seasonSlice";
import { RootState } from "./redux/store";

function App() {
  const dispatch = useDispatch();
  const season = useSelector((state: RootState) => state.season);

  useEffect(() => {
    dispatch(getSeasonAsync(season.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, season.current]);

  return (
    <div className="bg-rick-morty bg-no-repeat bg-cover bg-center h-screen w-screen overflow-scroll">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="episode/:id" element={<Episode />} />
        <Route path="character/:id" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
