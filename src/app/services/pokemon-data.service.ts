import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PokemonList } from '../models/PokemonList';
import { Pokemon } from '../models/Pokemon';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = "https://pokeapi.co/api/v2";
  PokemonList: PokemonList[] = [];
  moveList: {[key: string] : string}[] = [];
  moveTypeMap: {[key: string] : string}[] = [];
  private pokemonSource = new Subject<string>();
  pokemonContent$ = this.pokemonSource.asObservable();

  sharePokemonName(name: string): void {
    this.pokemonSource.next(name);
  }

  getSinglePokemonData(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${name}`).pipe(
      map(data => new Pokemon(data)),
      tap( (data) =>  this.PokemonList[data.name] = data)
    );
  }

  getSinglePokemonDataStatic(name: string): Pokemon {
    return this.PokemonList[name];
  }

  getPokemonSpecie(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon-species/${name}`);
  }

  getMoveDescription(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/move/${name}`).pipe(
      map(data => this.findMoveDescription(data)),
      tap( (data) =>  this.moveList[data.name] = data.desc)
    );
  }
  getMoveDescriptionStatic(name: string): string {
    return this.moveList[name];
  }

  getMovesPerType(type: string) {
    return this.http.get<any>(`${this.apiUrl}/type/${type}`).pipe(
      tap( (data) =>  {
        for(let i=0; i<data.moves.length; i++){
          this.moveTypeMap[data.moves[i].name] = data.name;
        }
      })
    );
  }

  getMovesPerTypeStatic(){
    return this.moveTypeMap;
  }

  findMoveDescription(data: any){
    for(let i=0; i<data.flavor_text_entries.length; i++){
      if(data.flavor_text_entries[i].language.name === "en"){
        return {name: data.name, desc: data.flavor_text_entries[i].flavor_text}
      }
    }
  }

  setPokemonDescription(name: string, desc: string){
    this.PokemonList[name].setDescription(desc);
  }


}
