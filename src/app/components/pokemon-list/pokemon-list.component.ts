import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Meta } from 'src/app/models/Meta';
import { PageState } from 'src/app/models/PageState';
import { PokemonDataService } from 'src/app/services/pokemon-data.service';
import { PokemonPage } from '../../models/PokemonPage';
import { getPage, setCurrentPageNumber } from '../../store/page.actions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  currentPokemonPage$: Observable<PokemonPage>;
  selectedPokemon = 'bulbasaur';
  currentPage: number;
  meta: Meta;

  metaSub: Subscription;
  pokemonSub: Subscription;
  currentPageSub: Subscription;

  constructor(
    private store: Store<{ page: PageState }>,
    private router: Router,
    private dataService: PokemonDataService
  ) {}

  ngOnInit(): void {
    this.getCurrentPage();
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.metaSub.unsubscribe();
    this.pokemonSub.unsubscribe();
    this.currentPageSub.unsubscribe();
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

    this.pokemonSub = this.dataService.pokemonContent$.subscribe(
      (data) => (this.selectedPokemon = data)
    );
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
  }
  // KeyValuePipe preserve property sorting
  originalOrder(
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number {
    return 0;
  }
}
