import { createReducer, on, Action } from '@ngrx/store';
import { PageState } from '../models/PageState';
import { getPageSuccess, getPageError } from './page.actions';

export const initialState: PageState = {
  meta: {
    count: 0,
    next: '',
    previous: ''
  },
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
  on(getPageError, (state, { error }) => ({ ...state, error: error }))
);

export function pageReducer(state: PageState, action: Action): PageState {
  return _pageReducer(state, action);
}
