import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { PokedexDisplayComponent } from './components/pokedex-display/pokedex-display.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { ReversePipe } from './pipes/ReversePipe';
import { CharToSpacePipe } from './pipes/CharToSpacePipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilterComponent } from './components/filter/filter.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

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
    MDBBootstrapModule.forRoot(),
    EffectsModule.forFeature([]),
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
