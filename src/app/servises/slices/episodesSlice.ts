import { createSlice } from '@reduxjs/toolkit';
import { fetchEpisodes } from '../thunks/episodesThunk';
import { EpisodeState } from '@/app/types/types';

const initialState: EpisodeState = {
  episodes: [],
  loading: false,
  error: null
};

const episodeSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEpisodes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = action.payload;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch episodes';
      });
  }
});

export default episodeSlice.reducer;
