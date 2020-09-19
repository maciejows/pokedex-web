import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@models/Meta';
import { PageState } from '@models/PageState';
import { PokemonPage } from '@models/PokemonPage';
import { PokemonState } from '@models/PokemonState';
import { Store } from '@ngrx/store';
import { getPage, setCurrentPageNumber } from '@store/page/page.actions';
import { selectPokemon } from '@store/pokemon/pokemon.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  currentPokemonPage$: Observable<PokemonPage>;
  selectedPokemon: string;
  currentPage: number;
  meta: Meta;

  selectedPokemonSub: Subscription;
  metaSub: Subscription;
  pokemonSub: Subscription;
  currentPageSub: Subscription;

  constructor(
    private store: Store<{ page: PageState; pokemon: PokemonState }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentPage();
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.metaSub.unsubscribe();
    this.pokemonSub.unsubscribe();
    this.currentPageSub.unsubscribe();
    this.selectedPokemonSub.unsubscribe();
  }

  getCurrentPage(): void {
    const queryParams = new URLSearchParams(location.search);
    this.currentPage = +queryParams.get('page');
    if (this.currentPage) {
      this.store.dispatch(
        setCurrentPageNumber({ pageNumber: this.currentPage })
      );
    } else {
      this.router.navigate(['pokemons'], {
        queryParams: { page: 1 },
        queryParamsHandling: 'merge'
      });
      this.store.dispatch(setCurrentPageNumber({ pageNumber: 1 }));
    }
  }

  initStoreSubscriptions(): void {
    this.currentPageSub = this.store
      .select((state) => state.page.currentPage)
      .subscribe((currentPage) => {
        this.currentPage = currentPage;
        this.store.dispatch(getPage({ page: this.currentPage }));
      });

    this.currentPokemonPage$ = this.store.select(
      (state) => state.page.pages[this.currentPage]
    );

    this.metaSub = this.store
      .select((state) => state.page.meta)
      .subscribe((meta) => (this.meta = meta));

    this.selectedPokemonSub = this.store
      .select((state) => state.pokemon.selectedPokemon)
      .subscribe((pokemon) => (this.selectedPokemon = pokemon));
  }

  changePage(event: number): void {
    this.router.navigate(['pokemons'], {
      queryParams: { page: event },
      queryParamsHandling: 'merge'
    });
    this.store.dispatch(setCurrentPageNumber({ pageNumber: event }));
  }

  changePokemon(event: string): void {
    this.router.navigate(['pokemons'], {
      queryParams: { name: event },
      queryParamsHandling: 'merge'
    });
    this.store.dispatch(selectPokemon({ pokemonName: event }));
  }
  // KeyValuePipe preserve property sorting
  originalOrder(
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number {
    return 0;
  }
}
