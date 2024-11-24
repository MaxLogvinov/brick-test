import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Character } from '@/app/types/types';

export const fetchCharacters = createAsyncThunk<
  Character[],
  { name: string; status?: string; species?: string; episode?: string },
  { rejectValue: string }
>('characters/fetchCharacters', async ({ name, status, species, episode }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?${name ? `name=${name}&` : ''}${
        status ? `status=${status}&` : ''
      }${species ? `species=${species}&` : ''}${episode ? `episode=${episode}` : ''}`
    );
    return response.data.results;
    //eslint-disable-next-line
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch characters');
  }
});
