import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../servises/thunks/charactersThunk';
import { RootState } from '../../servises/store';
import { AppDispatch } from '../../servises/store';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Avatar } from '@mui/material';
import Episodes from '../Episodes/Episodes';
import { fetchEpisodes } from '@/app/servises/thunks/episodesThunk';

const DEBOUNCE_DELAY = 1000;

// ToDo: pagination, loading, если персонажи не найдены

const CharacterSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [speciesOptions, setSpeciesOptions] = useState<string[]>([]);
  const [species, setSpecies] = useState<string | undefined>(undefined);

  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error } = useSelector((state: RootState) => state.characters);
  const { episodes } = useSelector((state: RootState) => state.episodes);

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

  // Загрузка эпизодов
  useEffect(() => {
    dispatch(fetchEpisodes());
  }, [dispatch]);

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
      <div className="flex items-center rounded-2xl flex-col p-6 gap-4 bg-inherit">
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
              className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300 cursor-pointer"
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
              className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300 cursor-pointer"
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
        <Accordion className="w-full bg-zinc-800 border-white text-inherit flex flex-col rounded-2xl">
          <AccordionSummary>Episodes:</AccordionSummary>
          <AccordionDetails>
            {' '}
            {episodes.length > 0 && <Episodes episodes={episodes} />}
          </AccordionDetails>
        </Accordion>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="py-1 px-0.5">
        {characters.map(character => (
          <Accordion
            className="bg-zinc-800 border-white text-inherit flex flex-col rounded-2xl"
            key={character.id}
          >
            <AccordionSummary
              className="w-full flex justify-between items-center gap-5 rounded-2xl "
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <div className="flex items-center gap-5">
                <Avatar src={character.image} alt={character.name} className="w-14 h-14" />
                <h3 className="px-4 text-xl">{character.name}</h3>
              </div>
              <div className="flex items-center justify-end gap-5">
                <p className="pl-4 text-base">Gender: {character.gender}</p>
                <p className="pl-4 text-base">Status: {character.status}</p>
                <p className="pl-4 text-base">Species: {character.species}</p>
              </div>
            </AccordionSummary>
            <AccordionDetails className="rounded-2xl">
              <ol className="list-decimal ml-5">
                <p className="pb-2.5">Episodes:</p>
                {character.episode.map(episodeUrl => (
                  <li key={episodeUrl}>
                    {episodes.find(ep => ep.url === episodeUrl)?.name || 'Loading...'}
                  </li>
                ))}
              </ol>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default CharacterSearch;
