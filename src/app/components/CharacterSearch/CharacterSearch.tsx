'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../servises/thunks/charactersThunk';
import { RootState } from '../../servises/store';
import Image from 'next/image';
import type { AppDispatch } from '../../servises/store';

const DEBOUNCE_DELAY = 1000;

const CharacterSearch: React.FC = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error } = useSelector((state: RootState) => state.characters);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (name.trim()) {
        dispatch(fetchCharacters(name));
      }
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [name, dispatch]);

  return (
    <div className="border-2 border-white w-3/6 rounded-2xl">
      <div className="flex  items-center flex-col p-6">
        <h1 className="text-3xl self-start">Вселенная Рик и Морти</h1>
        <label className="flex flex-col w-full">
          Имя персонажа
          <input
            type="text"
            value={name}
            className="text-black "
            onChange={e => setName(e.target.value)}
            placeholder="Введите имя персонажа"
          />
        </label>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <p className="">{character.name}</p>
            <Image
              className=""
              src={character.image}
              width={300}
              height={300}
              alt={character.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterSearch;