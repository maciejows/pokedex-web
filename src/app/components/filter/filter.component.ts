import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PageState } from '@models/PageState';
import { Store } from '@ngrx/store';
import { PokemonDataService } from '@services/pokemon-data.service';
import {
  clearPages,
  getFilteredPokemons,
  getPage,
  setCurrentPageNumber
} from '@store/page/page.actions';
import { selectPokemon } from '@store/pokemon/pokemon.actions';
import { Subscription, Observable, of, Subject } from 'rxjs';
import { getPokemonList } from '@store/filter/filter.actions';
import { FilterState } from '@models/FilterState';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RoutingService } from '@services/routing.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  typesMap = {};
  selectedTypeOption = '';
  pokemonName = '';
  pokemonList: string[];

  searchTerms = new Subject<string>();
  pokemonsFound$: Observable<string[]>;
  pokemonListSub: Subscription;
  metaSub: Subscription;

  constructor(
    private store: Store<{ page: PageState; filter: FilterState }>,
    private routingService: RoutingService,
    private pokemonDataService: PokemonDataService
  ) {}

  ngOnInit(): void {
    this.typesMap = this.pokemonDataService.typesMap;
    this.initStoreSubscriptions();
    this.pokemonsFound$ = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchTerm(term))
    );
  }

  ngOnDestroy(): void {
    this.metaSub.unsubscribe();
    this.pokemonListSub.unsubscribe();
  }

  search(term: string): void {
    term.toLowerCase();
    this.searchTerms.next(term);
  }

  searchTerm(term: string): Observable<string[]> {
    if (!term.trim()) {
      return of([]);
    }
    const result = this.pokemonList.filter((el) => el.includes(term));
    return of(result.slice(0, 10));
  }

  changePokemon(event: string): void {
    this.routingService.navigateWithParams({ name: event });

    this.store.dispatch(selectPokemon({ pokemonName: event }));
    this.searchTerms.next('');
  }

  initStoreSubscriptions(): void {
    this.metaSub = this.store
      .select((state) => state.page.meta)
      .subscribe((meta) => {
        if (meta.count > 0) {
          this.store.dispatch(getPokemonList({ limit: meta.count }));
          this.metaSub.unsubscribe();
        }
      });

    this.pokemonListSub = this.store
      .select((state) => state.filter.pokemonNames)
      .subscribe((names) => {
        this.pokemonList = names;
      });
  }

  getFilteredPage(type: string): void {
    this.selectedTypeOption = type;
    this.routingService.navigateWithParams({ page: 1 });
    this.store.dispatch(setCurrentPageNumber({ pageNumber: 1 }));
    this.store.dispatch(clearPages());

    if (this.selectedTypeOption === '') {
      this.store.dispatch(getPage({ page: 1 }));
    } else {
      this.store.dispatch(
        getFilteredPokemons({ pokemonType: this.selectedTypeOption })
      );
    }
  }
}
