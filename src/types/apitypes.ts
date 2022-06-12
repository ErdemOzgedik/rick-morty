type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

type BaseType = {
  id: number;
  name: string;
  url: string;
  created: string;
};

export type CharacterResponse = {
  info: Info;
  results: Character[];
};

export type SeasonResponse = {
  info: Info;
  results: Episode[];
};

export type Episode = BaseType & {
  air_date: string;
  episode: string;
  characters: string[];
};

export type Character = BaseType & {
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
};

export type CharacterInitial = {
  response: Character;
  pending: boolean;
  error: boolean;
};

export type EpisodeInitial = {
  response: Episode;
  pending: boolean;
  error: boolean;
  characters: Character[];
  searchedCharacters: Character[];
};

export type SeasonInitial = {
  current: string;
  response: SeasonResponse;
  pending: boolean;
  error: boolean;
};
