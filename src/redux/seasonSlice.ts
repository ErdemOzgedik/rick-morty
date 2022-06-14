import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SeasonInitial } from "../types/apitypes";
import { SEASON_ASYNC } from "../types/constants";
import { GetSeason } from "./apiCalls";

type APIErrorResponse = {
  error: string;
};

export const getSeasonAsync = createAsyncThunk(
  SEASON_ASYNC,
  async (id: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await GetSeason(id);

      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error as APIErrorResponse);
    }
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
  error: {
    code: "",
    message: "",
    stack: "",
  },
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
    builder.addCase(getSeasonAsync.fulfilled, (state, action) => {
      state.response = action.payload.payload;
      state.pending = false;
      state.error = {
        code: "",
        message: "",
        stack: "",
      };
    });
    builder.addCase(getSeasonAsync.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getSeasonAsync.rejected, (state, action) => {
      state.error = {
        code: action.error.code,
        message: action.error.message,
        stack: action.error.stack,
      };
      state.pending = false;
    });
  },
});

export const { getSeason, updateSeason } = seasonSlice.actions;
export default seasonSlice.reducer;
