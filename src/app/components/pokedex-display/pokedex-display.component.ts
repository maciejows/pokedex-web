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
    //{option: "skuteczność", clicked: false},
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
  movesMap: {[key: string] : string}[] = [];
  moveTypeMap: {[key: string] : string}[] = [];
  countMoves: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: PokemonDataService,
    ) { }

  ngOnInit(): void {
    //TODO Preserve wrong param type
    this.activatedRoute.url.subscribe(
      param => {
        let name = param[1].path;
        this.countMoves = 0;
        this.getPokemon(name);
        this.dataService.sharePokemonName(name);
        this.getMovesOfAllTypes();
      }
    );
  }

  getPokemon(name: string){
    if (this.dataService.PokemonList[name]) {
      this.pokemon = this.dataService.getSinglePokemonDataStatic(name)
      this.getMovesDescriptions();
    }
    else this.dataService.getSinglePokemonData(name).subscribe(
      (data) => {
        this.pokemon = data;
        this.getPokemonSpecie(name);
        this.getMovesDescriptions();
      }
    );
  }

  getMovesOfAllTypes(){
    for (const element of Object.keys(this.typesMap)) {
    this.getMovesOfSingleType(element);
    }
  }

  getMovesOfSingleType(type: string){
    if(Object.keys(this.dataService.moveTypeMap).length !== 0) {
      this.moveTypeMap = this.dataService.getMovesPerTypeStatic();
    }
    else this.dataService.getMovesPerType(type).subscribe(
      (data) => {
        for(let i=0; i<data.moves.length; i++){
          this.moveTypeMap[data.moves[i].name] = data.name;
        }
      }
    );
  }

  getPokemonSpecie(name: string){
    let specie = name;
    let index = name.search("-");
    if(name!=="nidoran-f" && name!=="nidoran-m" && index !== -1) specie = name.slice(0, index);
    this.dataService.getPokemonSpecie(specie).subscribe(
      (data) => {
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

  getMoveDescription(name: string){
    if (this.dataService.moveList[name]) {
      this.movesMap[name] = this.dataService.getMoveDescriptionStatic(name);
      this.countMoves++;
    }
    else this.dataService.getMoveDescription(name).subscribe(
      (data) => {
        this.movesMap[data.name] = data.desc;
        this.countMoves++;
      }
    );
  }

  getMovesDescriptions(){
    for(let i=0; i<this.pokemon.moves.length; i++){
      this.getMoveDescription(this.pokemon.moves[i].name);
    }
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

  getTypeColorByMove(move: string){
    return this.typesMap[this.moveTypeMap[move]];
  }
  getTypeByMove(move: string){
    return this.moveTypeMap[move];
  }

}
