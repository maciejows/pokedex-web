import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(private router: Router) {}

  navigateWithParams(params: { page?: string | number; name?: string }): void {
    this.router.navigate(['pokemons'], {
      queryParams: { ...params },
      queryParamsHandling: 'merge'
    });
  }
}
