import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data.service'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemonList: {};

  constructor(private dataService: PokemonDataService) { }

  ngOnInit(): void {
    this.dataService.getPokemonData().subscribe(
      (data) => this.pokemonList = data
    );
  }

  log(): void {
    console.log(this.pokemonList);
  }
}
