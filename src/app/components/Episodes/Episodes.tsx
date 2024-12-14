import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/servises/store';
import { fetchCharactersByUrls } from '@/app/servises/thunks/charactersThunk';
import { Episode } from '@/app/types/types';

interface EpisodesProps {
  episodes: Episode[];
}

const Episodes: React.FC<EpisodesProps> = ({ episodes }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleEpisodeClick = (characterUrls: string[]) => {
    dispatch(fetchCharactersByUrls(characterUrls));
  };

  return (
    <div className="w-full">
      {episodes.map(episode => (
        <Accordion key={episode.id} className="bg-zinc-800 text-inherit">
          <AccordionSummary>{episode.name}</AccordionSummary>
          <AccordionDetails>
            <p>Air Date: {episode.air_date}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => handleEpisodeClick(episode.characters)}
            >
              Show Characters
            </button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Episodes;
