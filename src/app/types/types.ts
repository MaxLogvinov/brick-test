export interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string;
  episode: [];
}

export interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
}

export interface EpisodeState {
  episodes: Episode[];
  loading: boolean;
  error: string | null;
}
