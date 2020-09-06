import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filter = new EventEmitter();

  typesMap: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    fighting: '#C03028',
    water: '#6890F0',
    flying: '#A890F0',
    grass: '#78C850',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    psychic: '#F85888',
    rock: '#B8A038',
    ice: '#98D8D8',
    bug: '#A8B820',
    dragon: '#7038F8',
    ghost: '#705898',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };
  typeKeys: string[] = [];
  selectedTypeOption = '';
  pokemonName = '';
  constructor() {}

  getFilteredPage() {
    this.pokemonName = this.pokemonName.toLowerCase();
    if (this.pokemonName !== '') {
      this.selectedTypeOption = '';
    }
    this.filter.emit(null);
    this.pokemonName = '';
  }

  selectTypeOption(type: string) {
    this.selectedTypeOption = type;
  }

  ngOnInit(): void {
    // Getting pokemon Type names
    for (const element of Object.keys(this.typesMap)) {
      this.typeKeys.push(element);
    }
  }
}
