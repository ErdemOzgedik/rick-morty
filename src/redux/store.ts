import { configureStore } from "@reduxjs/toolkit";
import episodeReducer from "./episodeSlice";

const store = configureStore({
  reducer: {
    episodes: episodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
