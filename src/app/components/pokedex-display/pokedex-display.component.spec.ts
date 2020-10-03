import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexDisplayComponent } from './pokedex-display.component';
import { StoreModule } from '@ngrx/store';
import { filterReducer } from '@store/filter/filter.reducer';
import { pageReducer } from '@store/page/page.reducer';
import { pokemonReducer } from '@store/pokemon/pokemon.reducer';
import { AppRoutingModule } from 'app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

describe('PokedexDisplayComponent', () => {
  let component: PokedexDisplayComponent;
  let fixture: ComponentFixture<PokedexDisplayComponent>;

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
      declarations: [PokedexDisplayComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
