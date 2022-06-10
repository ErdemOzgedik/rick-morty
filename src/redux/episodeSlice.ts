import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Episode } from "../types/apitypes";
import { GetEpisode } from "./apiCalls";

export const getEpisodeAsync = createAsyncThunk(
  `episode/detail`,
  async (id: string): Promise<Episode> => {
    const response = await GetEpisode(id);

    return response;
  }
);

type Example = {
  response: Episode;
  pending: boolean;
  error: boolean;
};

const initialState: Example = {
  response: {
    id: 0,
    name: "",
    url: "",
    characters: [],
    created: "",
    episode: "",
    air_date: "",
  },
  pending: false,
  error: false,
};

export const episodeSlice = createSlice({
  name: "episode",
  initialState: initialState,
  reducers: {
    getEpisode: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEpisodeAsync.fulfilled, (state, { payload }) => {
      state.response = payload;
      state.pending = false;
    });
    builder.addCase(getEpisodeAsync.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getEpisodeAsync.rejected, (state) => {
      state.error = true;
      state.pending = false;
    });
  },
});

export const { getEpisode } = episodeSlice.actions;
export default episodeSlice.reducer;
