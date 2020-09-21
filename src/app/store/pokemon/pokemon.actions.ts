import { Pokemon } from '@models/Pokemon';
import { createAction, props } from '@ngrx/store';
import { Move } from '@models/Move';

export const selectPokemon = createAction(
  '[Pokemon List Component] Select Pokemon',
  props<{ pokemonName: string }>()
);

export const getPokemonData = createAction(
  '[Pokemon Data Service] Get Pokemon Data',
  props<{ pokemonName: string }>()
);

export const getPokemonDataSuccess = createAction(
  '[Pokemon Data Service] Get Pokemon Data Success',
  props<{ pokemon: Pokemon; pokemonName: string }>()
);

export const getPokemonDataError = createAction(
  '[Pokemon Data Service] Get Pokemon Data Error',
  props<{ error: string }>()
);

export const getPokemonDesc = createAction(
  '[Pokemon Data Service] Get Pokemon Description',
  props<{ pokemonName: string }>()
);

export const getPokemonDescSuccess = createAction(
  '[Pokemon Data Service] Get Pokemon Description Success',
  props<{ desc: string; pokemonName: string }>()
);

export const getPokemonDescError = createAction(
  '[Pokemon Data Service] Get Pokemon Description Error',
  props<{ error: string }>()
);

export const getMoveDetails = createAction(
  '[Pokemon Data Service] Get Move Details',
  props<{ url: string; moveName: string }>()
);

export const getMoveDetailsSuccess = createAction(
  '[Pokemon Data Service] Get Move Details Success',
  props<{ move: Move; moveName: string }>()
);

export const getMoveDetailsError = createAction(
  '[Pokemon Data Service] Get Move Details Error',
  props<{ error: string }>()
);
