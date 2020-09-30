import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { StoreModule } from '@ngrx/store';
import { filterReducer } from '@store/filter/filter.reducer';
import { pageReducer } from '@store/page/page.reducer';
import { pokemonReducer } from '@store/pokemon/pokemon.reducer';
import { AppRoutingModule } from 'app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CountPagesPipe } from '@pipes/CountPages.pipe';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          filter: filterReducer,
          page: pageReducer,
          pokemon: pokemonReducer
        }),
        AppRoutingModule,
        HttpClientModule
      ],
      declarations: [PokemonListComponent, CountPagesPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
