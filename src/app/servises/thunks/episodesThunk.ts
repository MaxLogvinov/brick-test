import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Episode } from '@/app/types/types';

export const fetchEpisodes = createAsyncThunk<Episode[], void, { rejectValue: string }>(
  'episodes/fetchEpisodes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/episode');
      return response.data.results;
      //eslint-disable-next-line
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch episodes');
    }
  }
);
