import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterComponent } from '@components/filter/filter.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { PokedexDisplayComponent } from '@components/pokedex-display/pokedex-display.component';
import { PokemonListComponent } from '@components/pokemon-list/pokemon-list.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CharToSpacePipe } from '@pipes/CharToSpacePipe';
import { CountPagesPipe } from '@pipes/CountPagesPipe';
import { PageEffects } from '@store/page/page.effects';
import { PokemonEffects } from '@store/pokemon/pokemon.effects';
import { pageReducer } from '@store/page/page.reducer';
import { filterReducer } from '@store/filter/filter.reducer';
import { FilterEffects } from '@store/filter/filter.effects';
import { pokemonReducer } from '@store/pokemon/pokemon.reducer';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexDisplayComponent,
    PokemonListComponent,
    CharToSpacePipe,
    CountPagesPipe,
    NavbarComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
    EffectsModule.forRoot([PageEffects, PokemonEffects, FilterEffects]),
    StoreModule.forRoot({
      page: pageReducer,
      pokemon: pokemonReducer,
      filter: filterReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
