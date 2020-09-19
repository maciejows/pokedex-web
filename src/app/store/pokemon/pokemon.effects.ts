import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonDataService } from '@services/pokemon-data.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  getPokemonData,
  getPokemonDataError,
  getPokemonDataSuccess
} from './pokemon.actions';
import { Pokemon } from '@models/Pokemon';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonData),
      mergeMap((action) =>
        this.dataService.getPokemonData(action.pokemonName).pipe(
          map((pokemon) =>
            getPokemonDataSuccess({ pokemon: new Pokemon(pokemon) })
          ),
          catchError((error) => of(getPokemonDataError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: PokemonDataService
  ) {}
}
