import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PokemonPage } from '../models/PokemonPage';
import { PokemonPages } from '../models/PokemonPages';

@Injectable({
  providedIn: 'root'
})
export class PokemonPageService {
  constructor(private http: HttpClient) {}

  pokemonPages: PokemonPages = {};

  private apiUrl = 'https://pokeapi.co/api/v2';
  resource = 'pokemon';
  private _offset = 0;
  private _limit = 50;

  get limit(): number {
    return this._limit;
  }
  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    this._offset = value;
  }
  // Get page from server
  getPage(
    pageNumber: number,
    url?: string,
    query?: string
  ): Observable<PokemonPage> {
    // If "Type" filter set, getting pokemons of specific type(query), else getting Basic page
    if (query) {
      this.resource = `type/${query}`;
      this.pokemonPages = {};
      const endpoint = `${this.apiUrl}/${this.resource}`;
      return this.http.get<PokemonPage>(endpoint).pipe(
        map((data) => this.mapDataToPage(data)),
        tap((data) => (this.pokemonPages = this.paginate(data)))
      );
    }
    let endpoint = `${this.apiUrl}/${this.resource}?offset=${this._offset}&limit=${this._limit}`;
    // If url passed, making call for url endpoint
    if (url) {
      endpoint = url;
    }

    return this.http.get<PokemonPage>(endpoint).pipe(
      map((data) => new PokemonPage(data)),
      tap((data) => (this.pokemonPages[pageNumber] = data))
    );
  }
  // Get page from local service
  getPageStatic(pageNumber: number): PokemonPage {
    return this.pokemonPages[pageNumber];
  }
  // Paginate received data (only when filtering)
  paginate(data: PokemonPage): PokemonPages {
    const pokemonPages: PokemonPages = {};

    const count: number = +data.count;
    let results = [];
    let pageNumber = 1;
    for (let i = 0; i < count; i++) {
      results.push(data.results[i]);
      if (i === this._limit - 1 || i === count - 2) {
        pokemonPages[pageNumber] = {
          count: data.count,
          next: data.next,
          previous: data.previous,
          results: results
        };
        pageNumber++;
        results = [];
      }
    }
    return pokemonPages;
  }
  // Map received data to PokemonPage type
  mapDataToPage(data: any): PokemonPage {
    const results = [];
    let i: number;
    for (i = 0; i < data.pokemon.length; i++) {
      results.push(data.pokemon[i].pokemon);
    }
    const page: PokemonPage = {
      count: String(i + 1),
      next: '',
      previous: '',
      results: results
    };
    return page;
  }
  // Set page numbers
  fillPages(counter: number): Array<number> {
    const list: Array<number> = [];
    for (let i = 1; i <= counter; i++) {
      list.push(i);
    }
    return list;
  }
}
