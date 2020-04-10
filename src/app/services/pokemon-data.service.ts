import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ability } from '../models/Ability';
import { PokemonPage } from '../models/PokemonPage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  constructor(private http: HttpClient) { }

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

  getSinglePokemonData(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${id}`);
  }

  getSingleAbility(id: number): Observable<Ability> {
    return this.http.get<any>(`${this.apiUrl}/ability/${id}`).pipe(
      map(data =>  new Ability(data))
    );
  }

  getPage(): Observable<PokemonPage> {
    return this.http.get<PokemonPage>(`https://pokeapi.co/api/v2/pokemon?offset=${this._offset}&limit=${this.limit}`).pipe(
      map(data => new PokemonPage(data))
    );
  }

  getDataByUrl(url: string): Observable<PokemonPage> {
    return this.http.get<PokemonPage>(url).pipe(
      map(data => new PokemonPage(data))
    );
  }


}
