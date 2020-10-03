import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoveList } from '@models/MoveList';
import { Pokemon } from '@models/Pokemon';
import { PokemonState } from '@models/PokemonState';
import { Store } from '@ngrx/store';
import { PokemonDataService } from '@services/pokemon-data.service';
import { RoutingService } from '@services/routing.service';
import {
  getMoveDetails,
  getPokemonData,
  getPokemonDesc,
  selectPokemon
} from '@store/pokemon/pokemon.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokedex-display',
  templateUrl: './pokedex-display.component.html',
  styleUrls: ['./pokedex-display.component.scss']
})
export class PokedexDisplayComponent implements OnInit, OnDestroy {
  pokemon: Pokemon;
  pokemonSub: Subscription;
  selectedPokemon: string;
  selectedPokemonSub: Subscription;
  moves$: Observable<MoveList>;

  // Maping type to color
  typesMap = {};
  options: { option: string; clicked: boolean }[] = [
    { option: 'info', clicked: true },
    { option: 'moves', clicked: false },
    { option: 'stats', clicked: false }
  ];

  showShiny = false;

  constructor(
    private store: Store<{ pokemon: PokemonState }>,
    private routingService: RoutingService,
    private dataService: PokemonDataService
  ) {}

  ngOnInit(): void {
    this.typesMap = this.dataService.typesMap;
    this.setCurrentPokemon();
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.selectedPokemonSub.unsubscribe();
    this.pokemonSub.unsubscribe();
  }

  setCurrentPokemon(): void {
    const queryParams = new URLSearchParams(location.search);
    let pokemonName = queryParams.get('name')?.toLowerCase();
    if (!pokemonName) {
      pokemonName = 'bulbasaur';
      this.routingService.navigateWithParams({ name: pokemonName });
    }
    this.store.dispatch(selectPokemon({ pokemonName: pokemonName }));
  }

  initStoreSubscriptions(): void {
    this.selectedPokemonSub = this.store
      .select((state) => state.pokemon.selectedPokemon)
      .subscribe((pokemon) => {
        this.selectedPokemon = pokemon;
        this.store.dispatch(getPokemonData({ pokemonName: pokemon }));
      });

    this.pokemonSub = this.store
      .select((state) => state.pokemon.pokemons[this.selectedPokemon])
      .subscribe((pokemon) => {
        if (pokemon) {
          this.pokemon = pokemon;
          this.store.dispatch(
            getPokemonDesc({
              pokemonName: pokemon.name,
              url: pokemon.specieUrl
            })
          );
        }
      });

    this.moves$ = this.store.select((state) => state.pokemon.moves);
  }

  // Toggle between 'Info' , 'Moves', 'Stats'
  selectOption(selected: string): void {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].option === selected) this.options[i].clicked = true;
      else this.options[i].clicked = false;
    }
  }

  toggleShiny(): void {
    this.showShiny = !this.showShiny;
  }

  getMoveDetails(url: string, moveName: string): void {
    this.store.dispatch(getMoveDetails({ url: url, moveName: moveName }));
  }
}
