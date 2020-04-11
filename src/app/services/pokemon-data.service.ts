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
  PokemonList: PokemonList[] = []; //TODO : Models

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
      tap( (data) => this.PokemonList[data.name] = data )
    );
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

  getPage(pageNumber: number): Observable<PokemonPage> {
    console.log(`Fetching page ${pageNumber} from server`);
    return this.http.get<PokemonPage>(`https://pokeapi.co/api/v2/pokemon?offset=${this._offset}&limit=${this.limit}`).pipe(
      map(data => new PokemonPage(data)),
      tap( (data) => this.pokemonPages[pageNumber] = data )
    );
  }

  getPageStatic(pageNumber: number): PokemonPage {
    console.log("Getting static page" + pageNumber);
    return this.pokemonPages[pageNumber];
  }

  getDataByUrl(url: string): Observable<PokemonPage> {
    return this.http.get<PokemonPage>(url).pipe(
      map(data => new PokemonPage(data))
    );
  }


}
