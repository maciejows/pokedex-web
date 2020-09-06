import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Meta } from '../models/Meta';
import { PokemonPage } from '../models/PokemonPage';
import { PageService } from '../services/page.service';
import { getPage, getPageError, getPageSuccess } from './page.actions';

@Injectable()
export class PageEffects {
  loadPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPage),
      mergeMap((action) =>
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

  constructor(private actions$: Actions, private pageService: PageService) {}
}
