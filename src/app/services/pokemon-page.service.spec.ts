import { TestBed } from '@angular/core/testing';

import { PokemonPageService } from './pokemon-page.service';

describe('PokemonPageService', () => {
  let service: PokemonPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
