import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokedexDisplayComponent } from './components/pokedex-display/pokedex-display.component';

const routes: Routes = [
  {path: '', redirectTo:'/pokemon/1', pathMatch: 'full' },
  {path: 'pokemon/:id', component: PokedexDisplayComponent },
  {path: '**', redirectTo: '/pokemon/1'},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
