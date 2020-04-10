import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data.service'
import { PokemonPage } from '../../models/PokemonPage';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  singlePokemonPage: PokemonPage;

  constructor(private dataService: PokemonDataService) { }

  ngOnInit(): void {
    this.dataService.getPokemonData().subscribe(
      (data) => this.singlePokemonPage = data
    );
  }

  log(): void {
    console.log(this.singlePokemonPage);
    console.log(this.singlePokemonPage instanceof PokemonPage);
  }
}
