import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PageState } from 'src/app/models/PageState';
import { PokemonDataService } from '../../services/pokemon-data.service';
import {
  clearPages,
  getFilteredPokemons,
  getPage,
  setCurrentPageNumber
} from '../../store/page.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  typesMap = {};
  selectedTypeOption = '';
  pokemonName = '';
  constructor(
    private store: Store<{ page: PageState }>,
    private router: Router,
    private pokemonDataService: PokemonDataService
  ) {}

  ngOnInit(): void {
    this.typesMap = this.pokemonDataService.typesMap;
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
