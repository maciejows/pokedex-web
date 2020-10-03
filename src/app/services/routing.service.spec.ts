import { Location } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'app/app-routing.module';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  let service: RoutingService;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppRoutingModule]
    });
    service = TestBed.inject(RoutingService);
    location = TestBed.inject(Location);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#navigateWithParams should navigate to /pokemons?name=venusaur', fakeAsync(() => {
    service.navigateWithParams({ name: 'venusaur' });
    tick();
    expect(location.path()).toBe('/pokemons?name=venusaur');
  }));

  it('#navigateWithParams should navigate to /pokemons?name=venusaur&page=1', fakeAsync(() => {
    service.navigateWithParams({ name: 'venusaur', page: 1 });
    tick();
    expect(location.path()).toBe('/pokemons?name=venusaur&page=1');
  }));

  it('#navigateWithParams should navigate to /pokemons?page=1', fakeAsync(() => {
    service.navigateWithParams({ page: 1 });
    tick();
    expect(location.path()).toBe('/pokemons?page=1');
  }));

  it('#navigateWithParams should navigate to /pokemons?page=1&name=venusaur', fakeAsync(() => {
    service.navigateWithParams({ name: 'venusaur', page: 1 });
    tick();
    expect(location.path()).toBe('/pokemons?name=venusaur&page=1');
  }));

  it('#navigateWithParams should merge "name" param to params', fakeAsync(() => {
    service.navigateWithParams({ page: 1 });
    tick();
    service.navigateWithParams({ name: 'charizard' });
    tick();
    expect(location.path()).toBe('/pokemons?page=1&name=charizard');
  }));

  it('#navigateWithParams should merge "page" param to params', fakeAsync(() => {
    service.navigateWithParams({ name: 'charizard' });
    tick();
    service.navigateWithParams({ page: 1 });
    tick();
    expect(location.path()).toBe('/pokemons?name=charizard&page=1');
  }));
});
