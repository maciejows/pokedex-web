import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokedexDisplayComponent } from './components/pokedex-display/pokedex-display.component';

const routes: Routes = [
  {path: '', redirectTo:'/pokemon/bulbasaur', pathMatch: 'full' },
  {path: 'pokemon/:name', component: PokedexDisplayComponent },
  {path: '**', redirectTo: '/pokemon/bulbasaur'},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
