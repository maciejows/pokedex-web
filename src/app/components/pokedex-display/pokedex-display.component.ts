import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data.service'
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../models/Pokemon';
import { of } from 'rxjs'

@Component({
  selector: 'app-pokedex-display',
  templateUrl: './pokedex-display.component.html',
  styleUrls: ['./pokedex-display.component.scss']
})
export class PokedexDisplayComponent implements OnInit {
  pokemon: Pokemon;
  showShiny: boolean = false;
  options: {option: string, clicked: boolean}[] = [
    {option: "info", clicked: true},
    {option: "moves", clicked: false},
    {option: "stats", clicked: false},
    {option: "skuteczność", clicked: false},
  ];
  typesMap: {[key: string] : string} = {
    "normal": "#A8A878",
    "fire": "#F08030",
    "fighting": "#C03028",
    "water": "#6890F0",
    "flying": "#A890F0",
    "grass": "#78C850",
    "poison": "#A040A0",
    "electric": "#F8D030",
    "ground": "#E0C068",
    "psychic": "#F85888",
    "rock": "#B8A038",
    "ice": "#98D8D8",
    "bug": "#A8B820",
    "dragon": "#7038F8",
    "ghost": "#705898",
    "dark": "#705848",
    "steel": "#B8B8D0",
    "fairy": "#EE99AC",
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: PokemonDataService,
    ) { }

  ngOnInit(): void {
    //TODO Preserve wrong param type
    this.activatedRoute.url.subscribe(
      param => {
        let name = param[1].path;
        this.getPokemon(name);
        this.dataService.sharePokemonName(name);
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
        this.getPokemonSpecie(name);
      }
    );
  }

  getPokemonSpecie(name: string){
    this.dataService.getPokemonSpecie(name).subscribe(
      data => {
        for(let i=0; i<data.flavor_text_entries.length; i++){
          if (data.flavor_text_entries[i].language.name==="en"){
            this.pokemon.setDescription(data.flavor_text_entries[i].flavor_text);
            this.dataService.setPokemonDescription(name, data.flavor_text_entries[i].flavor_text);
            break;
          }
        }
      }
    )
  }

  selectOption(selected: string): void {
    for(let i=0; i<this.options.length; i++){
      if(this.options[i].option === selected) this.options[i].clicked = true;
      else this.options[i].clicked = false;
    }
  }

  toggleShiny(): void {
    this.showShiny = !this.showShiny;
  }
  log(){
    console.log(this.pokemon);
  }

}
