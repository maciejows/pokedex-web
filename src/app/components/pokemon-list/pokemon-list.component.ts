import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PageState } from 'src/app/models/PageState';
import { PokemonPage } from '../../models/PokemonPage';
import { getPage } from '../../store/page.actions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  currentPokemonPage$: Observable<PokemonPage>;
  selectedPokemon = 'bulbasaur';
  currentPageNumber = 0;

  constructor(private store: Store<{ page: PageState }>) {}

  ngOnInit(): void {
    this.store.dispatch(getPage({ page: 1 }));
    this.currentPokemonPage$ = this.store.select(
      (state) => state.page.pages[1]
    );
  }

  switchPage(event) {
    this.currentPageNumber = event;
  }
  // KeyValuePipe preserve property sorting
  originalOrder(
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number {
    return 0;
  }
}
