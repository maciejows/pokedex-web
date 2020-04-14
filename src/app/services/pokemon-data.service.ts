import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Ability } from '../models/Ability';
import { PokemonPage } from '../models/PokemonPage';
import { PokemonPages } from '../models/PokemonPages';
import { PokemonList } from '../models/PokemonList';
import { Pokemon } from '../models/Pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = "https://pokeapi.co/api/v2";
  private _offset: number = 0;
  private _limit: number = 50;
  pokemonPages: PokemonPages = {};
  selectedPokemon: string;
  PokemonList: PokemonList[] = [];

  log(){
    console.log(this.PokemonList);
  }

  get limit(): number {
    return this._limit;
  }
  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    this._offset = value;
  }

  getSinglePokemonData(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${name}`).pipe(
      map(data => new Pokemon(data)),
      tap( (data) =>  this.PokemonList[data.name] = data)
    );
  }

  getPokemonSpecie(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon-species/${name}`);
  }

  getSinglePokemonDataStatic(name: string): Pokemon {
    console.log("Getting static pokemon " + name);
    return this.PokemonList[name];
  }

  getSingleAbility(id: number): Observable<Ability> {
    return this.http.get<any>(`${this.apiUrl}/ability/${id}`).pipe(
      map(data => new Ability(data))
    );
  }

  getPage(pageNumber: number, url?: string): Observable<PokemonPage> {
    console.log(`Fetching page ${pageNumber} from server`);
    let endpoint = `${this.apiUrl}/pokemon?offset=${this._offset}&limit=${this.limit}`;
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

  setPokemonDescription(name: string, desc: string){
    this.PokemonList[name].setDescription(desc);
  }

  getDataByUrl(url: string) {
    return this.http.get<any>(url);
  }


}
