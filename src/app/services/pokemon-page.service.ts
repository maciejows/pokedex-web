import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PokemonPage } from '../models/PokemonPage';
import { PokemonPages } from '../models/PokemonPages';

@Injectable({
  providedIn: 'root'
})
export class PokemonPageService {
  constructor(private http: HttpClient) {
  }

  pokemonPages: PokemonPages = {};

  private apiUrl: string = "https://pokeapi.co/api/v2";
  resource: string = "pokemon";
  private _offset: number = 0;
  private _limit: number = 50;

  get limit(): number {
    return this._limit;
  }
  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    this._offset = value;
  }

  getPage(pageNumber: number, url?: string, query?: string): Observable<PokemonPage> {
    if(query) {
      this.resource = `type/${query}`;
      this.pokemonPages = {};
      let endpoint = `${this.apiUrl}/${this.resource}`;
      return this.http.get<PokemonPage>(endpoint).pipe(
        map(data => this.mapDataToPage(data)),
        tap( (data) => this.pokemonPages = this.paginate(data) )
      );
    }
    let endpoint = `${this.apiUrl}/${this.resource}?offset=${this._offset}&limit=${this._limit}`;
    if(url){
      endpoint = url;
    }

    return this.http.get<PokemonPage>(endpoint).pipe(
      map(data => new PokemonPage(data)),
      tap( (data) => this.pokemonPages[pageNumber] = data )
    );
  }

  paginate(data: PokemonPage): PokemonPages{
    let pokemonPages: PokemonPages = {};

    let count: number = +data.count;
    let results = [];
    let pageNumber = 1;
    for(let i=0; i<count; i++){
      results.push(data.results[i]);
      if(i === this._limit-1 || i === count-2){
        pokemonPages[pageNumber] = {
          count: data.count,
          next: data.next,
          previous: data.previous,
          results: results };
        pageNumber++;
        results = [];
      }
    }
    return pokemonPages;
  }

  mapDataToPage(data: any): PokemonPage{
    let page: PokemonPage;
    let results = []
    for (var i=0; i<data.pokemon.length; i++){
      results.push(data.pokemon[i].pokemon);
    }
    page = {
    count: String(i+1),
    next: "",
    previous: "",
    results: results}
    return page;
  }

  getPageStatic(pageNumber: number): PokemonPage {
    return this.pokemonPages[pageNumber];
  }

  fillPages(counter: number): Array<number> {
    let list: Array<number> = [];
    for (let i=1; i<= counter; i++){
      list.push(i);
    }
    return list
  }
}
