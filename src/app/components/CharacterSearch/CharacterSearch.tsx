import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../servises/thunks/charactersThunk';
import { RootState } from '../../servises/store';
import Image from 'next/image';
import type { AppDispatch } from '../../servises/store';

const DEBOUNCE_DELAY = 1000;

const CharacterSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [speciesOptions, setSpeciesOptions] = useState<string[]>([]);
  const [species, setSpecies] = useState<string | undefined>(undefined);

  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error } = useSelector((state: RootState) => state.characters);

  // Отправка запроса с дебаунсом
  useEffect(() => {
    const handler = setTimeout(() => {
      if (name.trim() || status || species) {
        dispatch(fetchCharacters({ name, status, species: species }));
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [name, status, species, dispatch]);

  // Получение уникальных видов из данных
  useEffect(() => {
    if (characters.length > 0) {
      const uniqueSpecies = Array.from(new Set(characters.map(character => character.species)));
      setSpeciesOptions(uniqueSpecies);
    }
  }, [characters]);

  // Обработчик для сброса статуса
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'reset' ? undefined : e.target.value;
    setStatus(value);
  };

  // Обработчик для сброса вида
  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'reset' ? undefined : e.target.value;
    setSpecies(value);
  };

  console.log(characters);

  return (
    <div className="border-2 border-white w-3/6 rounded-2xl font-get-schwifty bg-inherit">
      <div className="flex items-center flex-col p-6 gap-4 bg-inherit">
        <h1 className="text-4xl self-start">The universe of Rick and Morty</h1>
        <label className="flex flex-col w-full">
          Character name
          <input
            type="text"
            value={name}
            className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300"
            onChange={e => setName(e.target.value)}
            placeholder="Enter the character's name"
          />
        </label>
        <div className="flex items-center justify-between w-full gap-8 bg-inherit">
          <label className="flex flex-col w-full bg-inherit">
            Alive?
            <select
              className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300"
              value={status ?? 'reset'}
              onChange={handleStatusChange}
            >
              <option value="reset">select status / reset</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">unknown</option>
            </select>
          </label>
          <label className="flex flex-col w-full bg-inherit">
            Species
            <select
              className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300"
              value={species ?? 'reset'}
              onChange={handleSpeciesChange}
            >
              <option value="reset">select species / reset</option>
              {speciesOptions.map(species => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <p>{character.name}</p>
            <Image src={character.image} width={300} height={300} alt={character.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterSearch;
