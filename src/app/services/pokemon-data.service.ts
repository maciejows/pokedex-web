import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  moveTypeMap: { [key: string]: string }[] = [];
  // Emitting current selected pokemon change

  // Get pokemon data from server
  getPokemonData(name?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`);
  }

  getPokemonList(limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/?limit=${limit}`);
  }

  // Get pokemon specie (pokemon description purposes)
  getPokemonSpecie(specieUrl: string): Observable<any> {
    return this.http.get(specieUrl);
  }

  getMoveDetails(url: string): Observable<any> {
    return this.http.get(url);
  }
}
