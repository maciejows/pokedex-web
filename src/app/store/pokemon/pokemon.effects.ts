import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonDataService } from '@services/pokemon-data.service';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  withLatestFrom,
  filter
} from 'rxjs/operators';
import {
  getPokemonData,
  getPokemonDataError,
  getPokemonDataSuccess
} from './pokemon.actions';
import { Pokemon } from '@models/Pokemon';
import { PokemonState } from '@models/PokemonState';
import { Store } from '@ngrx/store';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonData),
      withLatestFrom(this.store.select((state) => state.pokemon.pokemons)),
      filter(([action, pokemons]) => !pokemons[action.pokemonName]),
      mergeMap(([action]) =>
        this.dataService.getPokemonData(action.pokemonName).pipe(
          map((pokemon) =>
            getPokemonDataSuccess({
              pokemon: new Pokemon(pokemon),
              pokemonName: action.pokemonName
            })
          ),
          catchError((error) => of(getPokemonDataError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: PokemonDataService,
    private store: Store<{ pokemon: PokemonState }>
  ) {}
}
