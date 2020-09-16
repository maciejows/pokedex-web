import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  limit = 50;

  constructor(private http: HttpClient) {}

  getPage(pageNumber: number): Observable<any> {
    console.log('Calling for page: ' + pageNumber);
    return this.http.get(
      `${this.apiUrl}?offset=${this.limit * (pageNumber - 1)}&limit=${
        this.limit
      }`
    );
  }
}
