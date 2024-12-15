import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../servises/store';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CharacterAccordion: React.FC = () => {
  const { characters } = useSelector((state: RootState) => state.characters);
  const { episodes } = useSelector((state: RootState) => state.episodes);

  return (
    <div className="py-1 px-0.5 bg-inherit text-inherit flex flex-col items-center">
      {characters.map(character => (
        <Accordion
          className="bg-zinc-800 w-full border-white text-inherit flex flex-col rounded-2xl"
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
              {character.episode.map(episodeUrl => {
                const episode = episodes.find(ep => ep.url === episodeUrl);
                if (!episode) {
                  return <li key={episodeUrl}>Loading...</li>;
                }
                // Извлекаем номер сезона и эпизода из поля episode
                const [series, episodeNumber] = episode.episode.slice(1).split('E');
                const formattedText = `Series: ${series}, Episode: ${episodeNumber}`;
                return (
                  <li key={episodeUrl}>
                    {formattedText} - {episode.name}
                  </li>
                );
              })}
            </ol>
          </AccordionDetails>
        </Accordion>
      ))}
      <Stack
        className="text-white [&_.Mui-selected]:bg-white/20 [&_.Mui-selected]:text-white"
        spacing={2}
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white'
          },
          '& .Mui-selected': {
            backgroundColor: 'rgba(23, 23, 23, 0.2)',
            color: 'white'
          }
        }}
      >
        <Pagination count={20} />
      </Stack>
    </div>
  );
};

export default CharacterAccordion;
