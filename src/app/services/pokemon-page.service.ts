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
  constructor(private http: HttpClient) { }

  pokemonPages: PokemonPages = {};

  private apiUrl: string = "https://pokeapi.co/api/v2";
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

  getPage(pageNumber: number, url?: string): Observable<PokemonPage> {
    console.log(`Fetching page ${pageNumber} from server`);
    let endpoint = `${this.apiUrl}/pokemon?offset=${this._offset}&limit=${this._limit}`;
    if(url){
      endpoint = url;
      console.log(`By url: ${url}`);
    }

    return this.http.get<PokemonPage>(endpoint).pipe(
      map(data => new PokemonPage(data)),
      tap( (data) => this.pokemonPages[pageNumber] = data )
    );
  }

  getPageStatic(pageNumber: number): PokemonPage {
    console.log("Getting static page" + pageNumber);
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
