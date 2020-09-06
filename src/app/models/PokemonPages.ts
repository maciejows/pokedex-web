import { PokemonPage } from './PokemonPage';

// Interface for mapping actual page number to Pokemons for this page

export interface PokemonPages {
  [key: number]: PokemonPage;
}
