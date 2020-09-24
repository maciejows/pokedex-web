import { createReducer, on, Action } from '@ngrx/store';
import { FilterState } from '@models/FilterState';
import { getPokemonListError, getPokemonListSuccess } from './filter.actions';

export const initialState: FilterState = {
  pokemonNames: []
};

const _filterReducer = createReducer(
  initialState,
  on(getPokemonListSuccess, (state, { pokemonNames }) => ({
    ...state,
    pokemonNames: pokemonNames
  })),
  on(getPokemonListError, (state, { error }) => ({ ...state, error: error }))
);

export function filterReducer(state: FilterState, action: Action): FilterState {
  return _filterReducer(state, action);
}
