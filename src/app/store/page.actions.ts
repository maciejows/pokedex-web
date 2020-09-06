import { createAction, props } from '@ngrx/store';
import { PageState } from '../models/PageState';
import { PokemonPage } from '../models/PokemonPage';
import { Meta } from '../models/Meta';

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
