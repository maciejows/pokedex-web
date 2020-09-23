import { MoveList } from './MoveList';
import { PokemonPages } from './PokemonPages';

export interface PokemonState {
  selectedPokemon: string;
  pokemons: PokemonPages;
  moves: MoveList;
  error: string;
}
