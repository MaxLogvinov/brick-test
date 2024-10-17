import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Character } from '@/app/types/types';

export const fetchCharacters = createAsyncThunk<Character[], string, { rejectValue: string }>(
  'characters/fetchCharacters',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?name=${name}`);
      console.log(response.data);
      return response.data.results;
      //eslint-disable-next-line
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch characters');
    }
  }
);
