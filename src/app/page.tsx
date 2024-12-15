'use client';

import CharacterSearch from './components/CharacterSearch';
import { Provider } from 'react-redux';
import { store } from '../app/servises/store';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

export default function Home() {
  const muiCache = createCache({ key: 'css', prepend: true });
  return (
    <Provider store={store}>
      <CacheProvider value={muiCache}>
        <div className="grid items-center justify-items-center font-get-schwifty bg-inherit">
          <header className="flex flex-wrap items-center justify-center"></header>
          <main className="flex flex-col gap-8 items-center w-full bg-inherit">
            <CharacterSearch />
          </main>
          <footer className="flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
      </CacheProvider>
    </Provider>
  );
}
