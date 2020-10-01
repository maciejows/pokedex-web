import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@models/Meta';
import { PageState } from '@models/PageState';
import { PokemonPage } from '@models/PokemonPage';
import { PokemonState } from '@models/PokemonState';
import { Store } from '@ngrx/store';
import { RoutingService } from '@services/routing.service';
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
  totalPages = 0;

  pokemonSub: Subscription;
  selectedPokemonSub: Subscription;
  currentPageSub: Subscription;
  metaSub: Subscription;

  constructor(
    private store: Store<{ page: PageState; pokemon: PokemonState }>,
    private routingService: RoutingService
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
      this.routingService.navigateWithParams({ page: 1 });
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
      .subscribe((meta) => {
        if (meta.count > 0)
          this.totalPages = this.countPages(meta.count, meta.limit);
        this.meta = meta;
      });

    this.selectedPokemonSub = this.store
      .select((state) => state.pokemon.selectedPokemon)
      .subscribe((pokemon) => (this.selectedPokemon = pokemon));
  }

  countPages(total: number, divider: number): number {
    return Math.ceil(total / divider);
  }

  changePage(event: number): void {
    if (event <= 0 || event > this.totalPages) return;
    this.routingService.navigateWithParams({ page: event });
    this.store.dispatch(setCurrentPageNumber({ pageNumber: event }));
  }

  changePokemon(event: string): void {
    this.routingService.navigateWithParams({ name: event });
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
