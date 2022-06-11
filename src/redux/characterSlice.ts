import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Character } from "../types/apitypes";
import { GetCharacter } from "./apiCalls";

export const getCharacterAsync = createAsyncThunk(
  `/character`,
  async (id: string): Promise<Character> => {
    const response = await GetCharacter(id);

    return response;
  }
);

// baska dosyaya al
type Example = {
  response: Character;
  pending: boolean;
  error: boolean;
};

const initialState: Example = {
  response: {
    id: 0,
    name: "",
    url: "",
    created: "",
    status: "",
    species: "",
    location: {
      name: "",
      url: "",
    },
    origin: {
      name: "",
      url: "",
    },
    image: "",
    episode: [],
    gender: "",
    type: "",
  },
  pending: false,
  error: false,
};

export const characterSlice = createSlice({
  name: "character",
  initialState: initialState,
  reducers: {
    getCharacter: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacterAsync.fulfilled, (state, { payload }) => {
      state.response = payload;
      state.pending = false;
    });
    builder.addCase(getCharacterAsync.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getCharacterAsync.rejected, (state) => {
      state.error = true;
      state.pending = false;
    });
  },
});

export const { getCharacter } = characterSlice.actions;
export default characterSlice.reducer;
