import { PokemonList } from './PokemonList';

export interface PokemonState {
  selectedPokemon: string;
  pokemons: PokemonList;
  error: string;
}
