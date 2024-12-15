import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterState } from '@/app/types/types';
import { fetchCharacters, fetchCharactersByUrls } from '../thunks/charactersThunk';

const initialState: CharacterState = {
  characters: [],
  info: { count: 0, pages: 0, next: null, prev: null },
  loading: false,
  error: null,
  name: '',
  species: '',
  status: ''
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setStatus: (state, action: PayloadAction<string | undefined>) => {
      state.status = action.payload;
    },
    setSpecies: (state, action: PayloadAction<string | undefined>) => {
      state.species = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCharacters.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload.results;
        state.info = action.payload.info;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch characters';
        state.characters = [];
        state.info = { count: 0, pages: 0, next: null, prev: null };
      })
      .addCase(fetchCharactersByUrls.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharactersByUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharactersByUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch characters';
        state.characters = [];
      });
  }
});

export const { setName, setSpecies, setStatus } = characterSlice.actions;
export default characterSlice.reducer;
