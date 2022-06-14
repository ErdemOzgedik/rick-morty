import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import episodeReducer from "./episodeSlice";
import seasonReducer from "./seasonSlice";
import characterReducer from "./characterSlice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    season: seasonReducer,
    episode: episodeReducer,
    character: characterReducer,
  },
  middleware: () => customizedMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
