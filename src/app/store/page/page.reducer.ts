import { PageState } from '@models/PageState';
import { Action, createReducer, on } from '@ngrx/store';
import {
  clearPages,
  getFilteredPokemonsSuccess,
  getPageError,
  getPageSuccess,
  setCurrentPageNumber
} from './page.actions';

export const initialState: PageState = {
  meta: {
    count: 0,
    offset: 0,
    limit: 50,
    next: '',
    previous: ''
  },
  currentPage: null,
  pages: {},
  error: ''
};

const _pageReducer = createReducer(
  initialState,
  on(getPageSuccess, (state, { page, pageNumber, meta }) => ({
    ...state,
    meta: { ...meta },
    pages: { ...state.pages, [pageNumber]: page }
  })),
  on(getPageError, (state, { error }) => ({ ...state, error: error })),
  on(setCurrentPageNumber, (state, { pageNumber }) => ({
    ...state,
    currentPage: pageNumber
  })),
  on(getFilteredPokemonsSuccess, (state, { pages, meta }) => ({
    ...state,
    meta: meta,
    pages: pages
  })),
  on(clearPages, (state) => ({ ...state, pages: {} }))
);

export function pageReducer(state: PageState, action: Action): PageState {
  return _pageReducer(state, action);
}
