import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { PokemonDataService } from '@services/pokemon-data.service';
import {
  getPokemonList,
  getPokemonListError,
  getPokemonListSuccess
} from './filter.actions';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FilterEffects {
  getPokemonNamesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonList),
      switchMap((action) =>
        this.dataService.getPokemonList(action.limit).pipe(
          map((data) =>
            getPokemonListSuccess({
              pokemonNames: data?.results?.map((el) => (el.name ? el.name : ''))
            })
          ),
          catchError((error) => of(getPokemonListError({ error: error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: PokemonDataService
  ) {}
}
