import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonDataService } from '@services/pokemon-data.service';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  withLatestFrom,
  filter,
  tap
} from 'rxjs/operators';
import {
  getPokemonData,
  getPokemonDataError,
  getPokemonDataSuccess,
  getPokemonDesc,
  getPokemonDescSuccess,
  getPokemonDescError,
  getMoveDetails,
  getMoveDetailsSuccess,
  getMoveDetailsError
} from './pokemon.actions';
import { Pokemon } from '@models/Pokemon';
import { PokemonState } from '@models/PokemonState';
import { Store } from '@ngrx/store';
import { Move } from '@models/Move';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonData),
      withLatestFrom(this.store.select((state) => state.pokemon.pokemons)),
      filter(([action, pokemons]) => !pokemons[action.pokemonName]?.id),
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

  loadPokemonDesc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonDesc),
      withLatestFrom(this.store.select((state) => state.pokemon.pokemons)),
      filter(
        ([action, pokemons]) => !pokemons[action.pokemonName]?.description
      ),
      mergeMap(([action]) =>
        this.dataService.getPokemonSpecie(action.pokemonName).pipe(
          map((pokemon) =>
            getPokemonDescSuccess({
              desc: Pokemon.makeDescription(pokemon),
              pokemonName: action.pokemonName
            })
          ),
          catchError((error) => of(getPokemonDescError({ error })))
        )
      )
    )
  );

  getMoveDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMoveDetails),
      withLatestFrom(this.store.select((state) => state.pokemon.moves)),
      filter(([action, moves]) => !moves[action.moveName]),
      mergeMap(([action]) =>
        this.dataService.getMoveDetails(action.url).pipe(
          map((move) =>
            getMoveDetailsSuccess({
              move: new Move({ ...move, url: action.url }),
              moveName: action.moveName
            })
          ),
          catchError((error) => of(getMoveDetailsError({ error })))
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
