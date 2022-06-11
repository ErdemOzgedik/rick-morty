import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Character, Episode } from "../types/apitypes";
import { GetCharacter, GetEpisode } from "./apiCalls";

export const getEpisodeCharacterAsync = createAsyncThunk(
  `episode/character`,
  async (id: string): Promise<Character> => {
    const response = await GetCharacter(id);

    return response;
  }
);

export const getEpisodeAsync = createAsyncThunk(
  `episode/detail`,
  async (id: string): Promise<Episode> => {
    const response = await GetEpisode(id);

    return response;
  }
);

// baska dosyaya al
type Example = {
  response: Episode;
  pending: boolean;
  error: boolean;
  characters: Character[];
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
  characters: [],
};

export const episodeSlice = createSlice({
  name: "episode",
  initialState: initialState,
  reducers: {
    sortCharacters: (state) => {
      state.characters = [...state.characters].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEpisodeAsync.fulfilled, (state, { payload }) => {
      state.response = payload;
      state.pending = false;
      state.characters = [];
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

export const { sortCharacters } = episodeSlice.actions;
export default episodeSlice.reducer;
