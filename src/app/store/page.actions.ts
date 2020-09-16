import { createAction, props } from '@ngrx/store';
import { Meta } from '../models/Meta';
import { PokemonPage } from '../models/PokemonPage';

export const getPage = createAction(
  '[Pokemon Page Service] Get Page',
  props<{ page: number }>()
);
export const getPageSuccess = createAction(
  '[Pokemon Page Service] Get Page Success',
  props<{ page: PokemonPage; pageNumber: number; meta: Meta }>()
);
export const getPageError = createAction(
  '[Pokemon Page Service] Get Page',
  props<{ error: string }>()
);

export const setCurrentPageNumber = createAction(
  '[Pokemon-list Component] Set current page number',
  props<{ pageNumber: number }>()
);
