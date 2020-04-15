import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
@NgModule({
  declarations: [
    AppComponent,
    PokedexDisplayComponent,
    PokemonListComponent,
    ReversePipe,
    CharToSpacePipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
