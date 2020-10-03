import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { StoreModule } from '@ngrx/store';
import { filterReducer } from '@store/filter/filter.reducer';
import { pageReducer } from '@store/page/page.reducer';
import { pokemonReducer } from '@store/pokemon/pokemon.reducer';
import { AppRoutingModule } from 'app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          page: pageReducer,
          pokemon: pokemonReducer,
          filter: filterReducer
        }),
        AppRoutingModule,
        HttpClientModule
      ],
      declarations: [FilterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
