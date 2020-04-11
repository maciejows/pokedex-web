import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data.service'
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {  ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pokedex-display',
  templateUrl: './pokedex-display.component.html',
  styleUrls: ['./pokedex-display.component.scss']
})
export class PokedexDisplayComponent implements OnInit {

  pokemon: {name: string};

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dataService: PokemonDataService,
    ) { }

  ngOnInit(): void {
    //TODO Preserve wrong param type

    this.activatedRoute.url.subscribe(
      param => {
        let name = param[1].path
        this.getPokemon(name);
      }
    );
  }

  getPokemon(name: string){
    if (this.dataService.PokemonList[name]) {
      this.pokemon = this.dataService.getSinglePokemonDataStatic(name)
    }
    else this.dataService.getSinglePokemonData(name).subscribe(
      (data) => {
        this.pokemon = data
      }
    );
  }

  log(){
    this.dataService.log();
  }

}
