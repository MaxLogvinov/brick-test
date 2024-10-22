'use client';

import CharacterSearch from './components/CharacterSearch/CharacterSearch';
import { Provider } from 'react-redux';
import { store } from '../app/servises/store';

export default function Home() {
  return (
    <Provider store={store}>
      <div className="grid items-center justify-items-center font-get-schwifty">
        <header className="flex flex-wrap items-center justify-center"></header>
        <main className="flex flex-col gap-8 items-center w-full ">
          <CharacterSearch />
        </main>
        <footer className="flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </Provider>
  );
}
