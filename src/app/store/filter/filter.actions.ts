import { createAction, props } from '@ngrx/store';

export const getPokemonList = createAction(
  '[Filter Component] Get Pokemon List',
  props<{ limit: number }>()
);

export const getPokemonListSuccess = createAction(
  '[Filter Component] Get Pokemon List Success',
  props<{ pokemonNames: string[] }>()
);

export const getPokemonListError = createAction(
  '[Filter Component] Get Pokemon List Error',
  props<{ error: string }>()
);
