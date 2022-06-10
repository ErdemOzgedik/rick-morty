import { configureStore } from "@reduxjs/toolkit";
import episodeReducer from "./episodeSlice";
import seasonReducer from "./seasonSlice";

const store = configureStore({
  reducer: {
    season: seasonReducer,
    episode: episodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
