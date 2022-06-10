import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EpisodeResponse } from "../types/apitypes";
import { GetEpisodes } from "./apiCalls";

export const getEpisodesAsync = createAsyncThunk(
  "episode",
  async (): Promise<EpisodeResponse> => {
    const response = await GetEpisodes();

    return response;
  }
);

type Example = {
  response: EpisodeResponse;
  pending: boolean;
  error: boolean;
};

const initialState: Example = {
  response: {
    info: {
      count: 0,
      pages: 0,
      next: "",
      prev: "",
    },
    results: [],
  },
  pending: false,
  error: false,
};

export const episodeSlice = createSlice({
  name: "episode",
  initialState: initialState,
  reducers: {
    getEpisodes: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEpisodesAsync.fulfilled, (state, { payload }) => {
      state.response = payload;
      state.pending = false;
    });
    builder.addCase(getEpisodesAsync.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getEpisodesAsync.rejected, (state) => {
      state.error = true;
      state.pending = false;
    });
  },
});

export const { getEpisodes } = episodeSlice.actions;
export default episodeSlice.reducer;
