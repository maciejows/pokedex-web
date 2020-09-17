import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pokemon } from '../models/Pokemon';
import { PokemonList } from '../models/PokemonList';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://pokeapi.co/api/v2';
  typesMap: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    fighting: '#C03028',
    water: '#6890F0',
    flying: '#A890F0',
    grass: '#78C850',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    psychic: '#F85888',
    rock: '#B8A038',
    ice: '#98D8D8',
    bug: '#A8B820',
    dragon: '#7038F8',
    ghost: '#705898',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };
  // List of already fetched pokemons
  PokemonList: PokemonList[] = [];
  // List of already fetched moves
  moveList: { [key: string]: string }[] = [];
  // Map of move.name : Type (ex. vine-whip -> grass)
  moveTypeMap: { [key: string]: string }[] = [];
  // Emitting current selected pokemon change
  private pokemonSource = new Subject<string>();
  pokemonContent$ = this.pokemonSource.asObservable();

  sharePokemonName(name: string): void {
    this.pokemonSource.next(name);
  }
  // Get pokemon data from server
  getSinglePokemonData(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${name}`).pipe(
      map((data) => new Pokemon(data)),
      tap((data) => (this.PokemonList[data.name] = data))
    );
  }
  // Get pokemon data from local service
  getSinglePokemonDataStatic(name: string): Pokemon {
    return this.PokemonList[name];
  }
  // Get pokemon specie (pokemon description purposes)
  getPokemonSpecie(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon-species/${name}`);
  }
  // Get move description from server
  getMoveDescription(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/move/${name}`).pipe(
      map((data) => this.findMoveDescription(data)),
      tap((data) => (this.moveList[data.name] = data.desc))
    );
  }
  // Get move description from local service
  getMoveDescriptionStatic(name: string): string {
    return this.moveList[name];
  }
  // Get moves of single Type
  getMovesPerType(type: string) {
    return this.http.get<any>(`${this.apiUrl}/type/${type}`).pipe(
      tap((data) => {
        for (let i = 0; i < data.moves.length; i++) {
          this.moveTypeMap[data.moves[i].name] = data.name;
        }
      })
    );
  }
  // Get moves of single Type from local service
  getMovesPerTypeStatic() {
    return this.moveTypeMap;
  }
  // Find move description in received data
  findMoveDescription(data: any) {
    for (let i = 0; i < data.flavor_text_entries.length; i++) {
      if (data.flavor_text_entries[i].language.name === 'en') {
        return {
          name: data.name,
          desc: data.flavor_text_entries[i].flavor_text
        };
      }
    }
  }
  // Set pokemon description
  setPokemonDescription(name: string, desc: string) {
    this.PokemonList[name].setDescription(desc);
  }
}
