import { PokemonState } from '@models/PokemonState';
import { Action, createReducer, on } from '@ngrx/store';
import {
  selectPokemon,
  getPokemonDataSuccess,
  getPokemonDataError
} from './pokemon.actions';

export const initalState: PokemonState = {
  selectedPokemon: 'bulbasaur',
  pokemon: {
    abilities: [],
    description: '',
    id: null,
    moves: [],
    name: '',
    sprites: {
      frontDefault: '',
      frontShiny: ''
    },
    stats: [],
    types: []
  },
  error: ''
};

const _pokemonReducer = createReducer(
  initalState,
  on(selectPokemon, (state, { pokemonName }) => ({
    ...state,
    selectedPokemon: pokemonName
  })),
  on(getPokemonDataSuccess, (state, { pokemon }) => ({
    ...state,
    pokemon: pokemon
  })),
  on(getPokemonDataError, (state, { error }) => ({ ...state, error: error }))
);

export function pokemonReducer(
  state: PokemonState,
  action: Action
): PokemonState {
  return _pokemonReducer(state, action);
}
