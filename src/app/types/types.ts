export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}
