import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Character, Episode, EpisodeInitial } from "../types/apitypes";
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
  async (id: string): Promise<Episode> => {
    const response = await GetEpisode(id);

    return response;
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
  error: false,
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
      state.response = payload;
      state.pending = false;
      state.characters = [];
      state.searchedCharacters = [];
    });
    builder.addCase(getEpisodeAsync.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getEpisodeAsync.rejected, (state) => {
      state.error = true;
      state.pending = false;
    });
    builder.addCase(
      getEpisodeCharacterAsync.fulfilled,
      (state, { payload }) => {
        state.characters = [...state.characters, payload];
        state.searchedCharacters = [...state.searchedCharacters, payload];
        state.pending = false;
      }
    );
    builder.addCase(getEpisodeCharacterAsync.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getEpisodeCharacterAsync.rejected, (state) => {
      state.error = true;
      state.pending = false;
    });
  },
});

export const { sortCharacters, searchCharacters } = episodeSlice.actions;
export default episodeSlice.reducer;
