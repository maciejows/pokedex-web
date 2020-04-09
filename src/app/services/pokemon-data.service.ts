import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ability } from '../models/Ability';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = "https://pokeapi.co/api/v2";

  getSinglePokemonData(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${id}`);
  }

  getSingleAbility(id: number): Observable<Ability> {
    return this.http.get<any>(`${this.apiUrl}/ability/${id}`).pipe(
      map(data =>  new Ability(data))
    );
  }

  getPokemonData(): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/`);
  }
}
