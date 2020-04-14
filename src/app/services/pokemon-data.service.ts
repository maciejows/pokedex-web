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

  selectedPokemon: string;
  PokemonList: PokemonList[] = [];

  log(){
    console.log(this.PokemonList);
  }

  getSinglePokemonData(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${name}`).pipe(
      map(data => new Pokemon(data)),
      tap( (data) =>  this.PokemonList[data.name] = data)
    );
  }

  getSinglePokemonDataStatic(name: string): Pokemon {
    console.log("Getting static pokemon " + name);
    return this.PokemonList[name];
  }

  getPokemonSpecie(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon-species/${name}`);
  }

  setPokemonDescription(name: string, desc: string){
    this.PokemonList[name].setDescription(desc);
  }

  // TODO: Use or delete
  getSingleAbility(id: number): Observable<Ability> {
    return this.http.get<any>(`${this.apiUrl}/ability/${id}`).pipe(
      map(data => new Ability(data))
    );
  }

}
