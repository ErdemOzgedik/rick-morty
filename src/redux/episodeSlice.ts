import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Character, EpisodeInitial } from "../types/apitypes";
import { EPISODE_ASYNC, EPISODE_CHARACTER_ASYNC } from "../types/constants";
import { GetCharacter, GetEpisode } from "./apiCalls";

export const getEpisodeCharacterAsync = createAsyncThunk(
  EPISODE_CHARACTER_ASYNC,
  async (id: string): Promise<Character> => {
    const response = await GetCharacter(id);

    return response;
  }
);

export const getEpisodeAsync = createAsyncThunk(
  EPISODE_ASYNC,
  async (id: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await GetEpisode(id);

      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: EpisodeInitial = {
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
  error: {
    code: "",
    message: "",
    stack: "",
  },
  characters: [],
  searchedCharacters: [],
};

export const episodeSlice = createSlice({
  name: "episode",
  initialState: initialState,
  reducers: {
    sortCharacters: (state) => {
      state.searchedCharacters = [...state.searchedCharacters].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
    searchCharacters: (state, action) => {
      state.searchedCharacters = [...state.characters].filter((character) => {
        return character.name
          .toLowerCase()
          .includes((action.payload as string).toLowerCase());
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEpisodeAsync.fulfilled, (state, { payload }) => {
      state.response = payload.payload;
      state.error = {
        code: "",
        message: "",
        stack: "",
      };
      state.pending = false;
      state.characters = [];
      state.searchedCharacters = [];
    });
    builder.addCase(getEpisodeAsync.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getEpisodeAsync.rejected, (state, action) => {
      state.error = {
        code: action.error.code,
        message: action.error.message,
        stack: action.error.stack,
      };
      state.pending = false;
    });
    builder.addCase(
      getEpisodeCharacterAsync.fulfilled,
      (state, { payload }) => {
        state.characters = [...state.characters, payload];
        state.searchedCharacters = [...state.searchedCharacters, payload];
        state.pending = false;
        state.error = {
          code: "",
          message: "",
          stack: "",
        };
      }
    );
    builder.addCase(getEpisodeCharacterAsync.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getEpisodeCharacterAsync.rejected, (state, action) => {
      state.error = state.error = {
        code: action.error.code,
        message: action.error.message,
        stack: action.error.stack,
      };
      state.pending = false;
    });
  },
});

export const { sortCharacters, searchCharacters } = episodeSlice.actions;
export default episodeSlice.reducer;
