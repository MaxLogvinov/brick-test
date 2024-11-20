import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import episodesReducer from './slices/episodesSlice';

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    episodes: episodesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
