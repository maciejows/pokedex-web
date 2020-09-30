import { TestBed } from '@angular/core/testing';
import { PageService } from './page.service';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PokemonPageService', () => {
  let service: PageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    service = TestBed.inject(PageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getPage should return array of 50 pokemons', () => {
    const dummyResult = [...Array(50).keys()];
    service.getPage(1).subscribe((data) => {
      expect(data.results.length).toBe(50);
    });
    const req = httpMock.expectOne(
      `${service.apiUrl}/pokemon?offset=0&limit=50`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ results: dummyResult });
  });

  it('#getFilteredPokemons should return "ground" pokemons', () => {
    const dummyResult = {
      name: 'ground',
      pokemon: [{ pokemon: { name: 'sandshrew', url: 'some url' } }]
    };
    service.getFilteredPokemons('ground').subscribe((data) => {
      expect(data.name).toBe('ground');
      expect(data.pokemon.length).toBeGreaterThan(0);
    });
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/type/ground');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResult);
  });
});
