import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SeasonResponse } from "../types/apitypes";
import { GetSeason } from "./apiCalls";

export const getSeasonAsync = createAsyncThunk(
  "season",
  async (id: string): Promise<SeasonResponse> => {
    const response = await GetSeason(id);

    return response;
  }
);

type Example = {
  current: string;
  response: SeasonResponse;
  pending: boolean;
  error: boolean;
};

const initialState: Example = {
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

export const { getSeason } = seasonSlice.actions;
export default seasonSlice.reducer;
