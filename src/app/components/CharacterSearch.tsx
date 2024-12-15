import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../servises/thunks/charactersThunk';
import { RootState } from '../servises/store';
import { AppDispatch } from '../servises/store';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Episodes from './Episodes';
import { fetchEpisodes } from '@/app/servises/thunks/episodesThunk';
import { speciesOptions, statusOptions } from '@/app/utils/options';
import { clearEpisodes } from '@/app/servises/slices/episodesSlice';
import Loading from './Loading';
import CharacterAccordion from './CharacterAccordion';
import { Character } from '../types/types';
import { setName, setSpecies, setStatus } from '../servises/slices/characterSlice';

const DEBOUNCE_DELAY = 1000;

const CharacterSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error, name, status, species } = useSelector(
    (state: RootState) => state.characters
  );
  const { episodes } = useSelector((state: RootState) => state.episodes);

  // Отправка запроса с дебаунсом
  useEffect(() => {
    const handler = setTimeout(() => {
      if (name.trim() || status || species) {
        dispatch(fetchCharacters({ name, status, species })).then(action => {
          if (fetchCharacters.fulfilled.match(action)) {
            const { results } = action.payload;
            const allEpisodeUrls = results.flatMap((character: Character) => character.episode);
            dispatch(fetchEpisodes(Array.from(new Set(allEpisodeUrls))));
          } else if (fetchCharacters.rejected.match(action)) {
            dispatch(clearEpisodes());
          }
        });
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [name, status, species, dispatch]);

  // Обработчик для сброса статуса
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'reset' ? undefined : e.target.value;
    dispatch(setStatus(value));
  };

  // Обработчик для сброса вида
  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'reset' ? undefined : e.target.value;
    dispatch(setSpecies(value));
  };

  console.log(characters);

  return (
    <div className="border-2 border-white sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 rounded-2xl font-get-schwifty bg-inherit text-inherit mt-3">
      <div className="flex items-center rounded-2xl flex-col p-6 gap-4 bg-inherit ">
        <h1 className=" sm:text-2xl lg:text-3xl xl:text-4xl">The universe of Rick and Morty</h1>
        <label className="flex flex-col w-full">
          Character name
          <input
            type="text"
            value={name}
            className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300"
            onChange={e => dispatch(setName(e.target.value))}
            placeholder="Enter the character's name"
          />
        </label>
        <div className="flex items-center justify-between w-full gap-8 bg-inherit max-sm:flex-col">
          <label className="flex flex-col w-full bg-inherit">
            Alive?
            <select
              className="pl-1.5 rounded-lg bg-inherit border border-solid border-gray-300 cursor-pointer"
              value={status ?? 'reset'}
              onChange={handleStatusChange}
            >
              <option value="reset">select status / reset</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
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
            {episodes.length > 0 && <Episodes episodes={episodes} />}
          </AccordionDetails>
        </Accordion>
        {error && <p className="text-4xl">Error: Characters not found</p>}
      </div>
      <CharacterAccordion />
      {loading && <Loading />}
    </div>
  );
};

export default CharacterSearch;
