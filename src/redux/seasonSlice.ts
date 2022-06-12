import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SeasonInitial, SeasonResponse } from "../types/apitypes";
import { SEASON_ASYNC } from "../types/constants";
import { GetSeason } from "./apiCalls";

export const getSeasonAsync = createAsyncThunk(
  SEASON_ASYNC,
  async (id: string): Promise<SeasonResponse> => {
    const response = await GetSeason(id);

    return response;
  }
);

const initialState: SeasonInitial = {
  current: "1",
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

export const seasonSlice = createSlice({
  name: "season",
  initialState: initialState,
  reducers: {
    getSeason: (state, action) => {
      state.response = action.payload;
    },
    updateSeason: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSeasonAsync.fulfilled, (state, { payload }) => {
      state.response = payload;
      state.pending = false;
    });
    builder.addCase(getSeasonAsync.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getSeasonAsync.rejected, (state) => {
      state.error = true;
      state.pending = false;
    });
  },
});

export const { getSeason, updateSeason } = seasonSlice.actions;
export default seasonSlice.reducer;
