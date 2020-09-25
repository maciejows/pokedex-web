import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexDisplayComponent } from './components/pokedex-display/pokedex-display.component';

const routes: Routes = [
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: 'pokemons', component: PokedexDisplayComponent },
  { path: '**', redirectTo: '/pokemons' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
