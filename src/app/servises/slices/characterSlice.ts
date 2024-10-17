import { createSlice } from '@reduxjs/toolkit';
import { CharacterState } from '@/app/types/types';
import { fetchCharacters } from '../thunks/charactersThunk';

const initialState: CharacterState = {
  characters: [],
  loading: false,
  error: null
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCharacters.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch characters';
      });
  }
});

export default characterSlice.reducer;
