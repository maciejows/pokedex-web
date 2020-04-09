import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data.service'

@Component({
  selector: 'app-pokedex-display',
  templateUrl: './pokedex-display.component.html',
  styleUrls: ['./pokedex-display.component.scss']
})
export class PokedexDisplayComponent implements OnInit {

  constructor(private pokemonData: PokemonDataService) { }

  pokemon: any;

  ngOnInit(): void {
    this.pokemonData.getPokemonData(1).subscribe(
      (data) => this.pokemon = data
    );
  }

  log(): void {
    console.log(this.pokemon);
  }
}
