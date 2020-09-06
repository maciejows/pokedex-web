import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokedexDisplayComponent } from './components/pokedex-display/pokedex-display.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { CharToSpacePipe } from './pipes/CharToSpacePipe';
import { ReversePipe } from './pipes/ReversePipe';
import { PageEffects } from './store/page.effects';
import { pageReducer } from './store/page.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PokedexDisplayComponent,
    PokemonListComponent,
    ReversePipe,
    CharToSpacePipe,
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
    EffectsModule.forRoot([PageEffects]),
    StoreModule.forRoot({ page: pageReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
