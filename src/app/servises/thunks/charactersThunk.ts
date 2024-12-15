import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Character } from '@/app/types/types';

export const fetchCharacters = createAsyncThunk<
  {
    results: Character[];
    info: { count: number; pages: number; next: string | null; prev: string | null };
  },
  { name: string; status?: string; species?: string; episode?: string; page?: number },
  { rejectValue: string }
>(
  'characters/fetchCharacters',
  async ({ name, status, species, episode, page }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (status) params.append('status', status);
      if (species) params.append('species', species);
      if (episode) params.append('episode', episode);
      if (page) params.append('page', page.toString());

      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch characters';
      return rejectWithValue(message);
    }
  }
);

export const fetchCharactersByUrls = createAsyncThunk<
  Character[],
  string[],
  { rejectValue: string }
>('characters/fetchByUrls', async (characterUrls, { rejectWithValue }) => {
  try {
    const uniqueIds = Array.from(
      new Set(characterUrls.map(url => url.split('/').pop() || ''))
    ).join(',');
    const response = await fetch(`https://rickandmortyapi.com/api/character/${uniqueIds}`);
    if (!response.ok) throw new Error('Failed to fetch characters');
    const data = await response.json();

    return Array.isArray(data) ? data : [data];
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch characters';
    return rejectWithValue(message);
  }
});
