import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  apiUrl = 'https://pokeapi.co/api/v2';
  limit = 50;

  constructor(private http: HttpClient) {}

  getPage(pageNumber: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/pokemon?offset=${this.limit * (pageNumber - 1)}&limit=${
        this.limit
      }`
    );
  }

  getFilteredPokemons(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/type/${type}`);
  }
}
