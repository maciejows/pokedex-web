import { TestBed } from '@angular/core/testing';
import { PokemonDataService } from './pokemon-data.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('PokemonDataService', () => {
  let service: PokemonDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PokemonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
