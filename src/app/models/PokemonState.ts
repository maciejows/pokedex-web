import { PokemonList } from './PokemonList';
import { MoveList } from './MoveList';

export interface PokemonState {
  selectedPokemon: string;
  pokemons: PokemonList;
  moves: MoveList;
  error: string;
}
