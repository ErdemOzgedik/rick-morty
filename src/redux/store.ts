import { configureStore } from "@reduxjs/toolkit";
import episodeReducer from "./episodeSlice";
import seasonReducer from "./seasonSlice";
import characterReducer from "./characterSlice";

const store = configureStore({
  reducer: {
    season: seasonReducer,
    episode: episodeReducer,
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
