import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PokedexDisplayComponent } from './components/pokedex-display/pokedex-display.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexDisplayComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
