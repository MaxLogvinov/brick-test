import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../servises/store';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { fetchCharacters } from '../servises/thunks/charactersThunk';
import { AppDispatch } from '../servises/store';

const CharacterAccordion: React.FC = () => {
  const { characters, info, name, status, species } = useSelector(
    (state: RootState) => state.characters
  );
  const { episodes } = useSelector((state: RootState) => state.episodes);
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(fetchCharacters({ name, status, species, page }));
  };

  return (
    <div className="py-1 px-0.5 bg-inherit text-inherit flex flex-col items-center mb-3">
      {characters.map(character => (
        <Accordion
          className="bg-zinc-800 w-full border-white text-inherit flex flex-col rounded-2xl"
          key={character.id}
        >
          <AccordionSummary
            sx={{
              '&.MuiAccordionSummary-root': {
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center'
              }
            }}
            className="w-full flex items-center"
          >
            <div className=" flex justify-center items-center gap-5 rounded-2xl  max-sm:flex-col max-sm:justify-center max-sm:self-center max-sm:gap-1">
              <div className="flex items-center gap-5 max-sm:gap-1">
                <Avatar src={character.image} alt={character.name} className="w-14 h-14" />
                <h3 className="px-4 text-xl max-sm:text-base">{character.name}</h3>
              </div>
              <div className="flex items-center justify-end gap-5 max-sm:gap-1 max-sm:flex-col  max-sm:justify-center">
                <p className="pl-4 text-base max-sm:text-sm">Gender: {character.gender}</p>
                <p className="pl-4 text-base max-sm:text-sm">Status: {character.status}</p>
                <p className="pl-4 text-base max-sm:text-sm">Species: {character.species}</p>
              </div>
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
        <Pagination count={info.pages} onChange={handlePageChange} color="primary" />
      </Stack>
    </div>
  );
};

export default CharacterAccordion;
