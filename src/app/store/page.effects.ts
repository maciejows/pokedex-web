import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { Meta } from '../models/Meta';
import { PageState } from '../models/PageState';
import { PokemonPage } from '../models/PokemonPage';
import { PageService } from '../services/page.service';
import { getPage, getPageError, getPageSuccess } from './page.actions';

@Injectable()
export class PageEffects {
  loadPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPage),
      withLatestFrom(this.store.select((state) => state.page.pages)),
      filter(([action, pages]) => !pages[action.page]),
      switchMap(([action, pages]) =>
        this.pageService.getPage(action.page).pipe(
          map((data) =>
            getPageSuccess({
              meta: new Meta(data),
              page: new PokemonPage(data),
              pageNumber: action.page
            })
          ),
          catchError((error) => of(getPageError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pageService: PageService,
    private store: Store<{ page: PageState }>
  ) {}
}
