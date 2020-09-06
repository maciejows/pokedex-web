import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexDisplayComponent } from './pokedex-display.component';

describe('PokedexDisplayComponent', () => {
  let component: PokedexDisplayComponent;
  let fixture: ComponentFixture<PokedexDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
