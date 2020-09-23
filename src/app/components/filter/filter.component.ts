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
import { Subscription } from 'rxjs';
import { getPokemonList } from '@store/filter/filter.actions';
import { FilterState } from '@models/FilterState';

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

  pokemonListSub: Subscription;
  metaSub: Subscription;

  constructor(
    private store: Store<{ page: PageState; filter: FilterState }>,
    private router: Router,
    private pokemonDataService: PokemonDataService
  ) {}

  ngOnInit(): void {
    this.typesMap = this.pokemonDataService.typesMap;
    this.initStoreSubscriptions();
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
      .subscribe((names) => (this.pokemonList = names));
  }

  ngOnDestroy(): void {
    this.metaSub.unsubscribe();
    this.pokemonListSub.unsubscribe();
  }

  getFilteredPage(): void {
    this.router.navigate(['pokemons'], {
      queryParams: { page: 1 },
      queryParamsHandling: 'merge'
    });
    this.store.dispatch(setCurrentPageNumber({ pageNumber: 1 }));

    if (this.selectedTypeOption === '') {
      this.store.dispatch(clearPages());
      this.store.dispatch(getPage({ page: 1 }));
    } else {
      this.store.dispatch(
        getFilteredPokemons({ pokemonType: this.selectedTypeOption })
      );
    }
  }

  selectTypeOption(type: string): void {
    this.selectedTypeOption = type;
  }
}
