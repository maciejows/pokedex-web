import { Pokemon } from './Pokemon'
// Interface for mapping single pokemon to pokemon name
export interface PokemonList {
  [key: string] : Pokemon;
}
