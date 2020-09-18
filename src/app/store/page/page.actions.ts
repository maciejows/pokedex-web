import { Meta } from '@models/Meta';
import { PokemonPage } from '@models/PokemonPage';
import { PokemonPages } from '@models/PokemonPages';
import { createAction, props } from '@ngrx/store';

export const getPage = createAction(
  '[Pokemon Page Service] Get Page',
  props<{ page: number }>()
);
export const getPageSuccess = createAction(
  '[Pokemon Page Service] Get Page Success',
  props<{ page: PokemonPage; pageNumber: number; meta: Meta }>()
);
export const getPageError = createAction(
  '[Pokemon Page Service] Get Page Error',
  props<{ error: string }>()
);

export const getFilteredPokemons = createAction(
  '[Pokemon Page Service] Get Filtered Page',
  props<{ pokemonType: string }>()
);
export const getFilteredPokemonsSuccess = createAction(
  '[Pokemon Page Service] Get Filtered Page Success',
  props<{ pages: PokemonPages; meta: Meta }>()
);

export const setCurrentPageNumber = createAction(
  '[Pokemon-list Component] Set current page number',
  props<{ pageNumber: number }>()
);

export const clearPages = createAction('[Filter Component] Clear Pages');
