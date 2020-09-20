import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '@models/Pokemon';
import { PokemonState } from '@models/PokemonState';
import { Store } from '@ngrx/store';
import {
  getPokemonData,
  selectPokemon,
  getPokemonDesc
} from '@store/pokemon/pokemon.actions';
import { Observable, Subscription } from 'rxjs';
import { PokemonDataService } from '@services/pokemon-data.service';

@Component({
  selector: 'app-pokedex-display',
  templateUrl: './pokedex-display.component.html',
  styleUrls: ['./pokedex-display.component.scss']
})
export class PokedexDisplayComponent implements OnInit {
  pokemon$: Observable<Pokemon>;
  selectedPokemon: string;
  selectedPokemonSub: Subscription;

  showShiny = false;
  options: { option: string; clicked: boolean }[] = [
    { option: 'info', clicked: true },
    { option: 'moves', clicked: false },
    { option: 'stats', clicked: false }
  ];
  // Maping type to color
  typesMap = {};
  // Maping move's name to description
  movesMap: { [key: string]: string }[] = [];
  // Maping move's name to move Type (ex. poison)
  moveTypeMap: { [key: string]: string }[] = [];
  countMoves = 0;
  constructor(
    private store: Store<{ pokemon: PokemonState }>,
    private router: Router,
    private dataService: PokemonDataService
  ) {}

  ngOnInit(): void {
    this.typesMap = this.dataService.typesMap;
    this.getCurrentPokemon();
    this.selectedPokemonSub = this.store
      .select((state) => state.pokemon.selectedPokemon)
      .subscribe((pokemon) => {
        this.selectedPokemon = pokemon;
        this.store.dispatch(getPokemonData({ pokemonName: pokemon }));
        this.store.dispatch(getPokemonDesc({ pokemonName: pokemon }));
      });

    this.pokemon$ = this.store.select(
      (state) => state.pokemon.pokemons[this.selectedPokemon]
    );
  }

  getCurrentPokemon(): void {
    const queryParams = new URLSearchParams(location.search);
    let pokemonName = queryParams.get('name');
    if (!pokemonName) {
      pokemonName = 'bulbasaur';
      this.router.navigate(['pokemons'], {
        queryParams: { name: pokemonName },
        queryParamsHandling: 'merge'
      });
    }
    this.store.dispatch(selectPokemon({ pokemonName: pokemonName }));
  }

  // Toggle between 'Info' , 'Moves', 'Stats'
  selectOption(selected: string): void {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].option === selected) this.options[i].clicked = true;
      else this.options[i].clicked = false;
    }
  }

  // Show shiny version
  toggleShiny(): void {
    this.showShiny = !this.showShiny;
  }

  /* 
  ngOnInit(): void {
    this.typesMap = this.pokemonDataService.typesMap;
    this.activatedRoute.queryParams.subscribe((param) => {
      const name = param['name'];
      if (name) {
        this.countMoves = 0;
        this.getPokemon(name);
        this.pokemonDataService.sharePokemonName(name);
        this.getMovesOfAllTypes();
      } else {
        this.router.navigate(['pokemons'], {
          queryParams: { name: 'bulbasaur' },
          queryParamsHandling: 'merge'
        });
      }
    });
  }
  
  // Fetch pokemon, if already fetched get static version
  getPokemon(name: string) {
    if (this.pokemonDataService.PokemonList[name]) {
      this.pokemon = this.pokemonDataService.getSinglePokemonDataStatic(name);
      this.getMovesDescriptions();
    } else
      this.pokemonDataService.getSinglePokemonData(name).subscribe((data) => {
        this.pokemon = data;
        this.getPokemonSpecie(name);
        this.getMovesDescriptions();
      });
  }
  // Get every move
  getMovesOfAllTypes() {
    for (const element of Object.keys(this.typesMap)) {
      this.getMovesOfSingleType(element);
    }
  }
  // Get list of moves of specific Type (ex. Poison), if already fetched get static version
  getMovesOfSingleType(type: string) {
    if (Object.keys(this.pokemonDataService.moveTypeMap).length !== 0) {
      this.moveTypeMap = this.pokemonDataService.getMovesPerTypeStatic();
    } else
      this.pokemonDataService.getMovesPerType(type).subscribe((data) => {
        for (let i = 0; i < data.moves.length; i++) {
          this.moveTypeMap[data.moves[i].name] = data.name;
        }
      });
  }
  // Get pokemon specie - pokemon description purposes
  getPokemonSpecie(name: string) {
    let specie = name;
    const index = name.search('-');
    if (name !== 'nidoran-f' && name !== 'nidoran-m' && index !== -1)
      specie = name.slice(0, index);
    this.pokemonDataService.getPokemonSpecie(specie).subscribe((data) => {
      for (let i = 0; i < data.flavor_text_entries.length; i++) {
        if (data.flavor_text_entries[i].language.name === 'en') {
          this.pokemon.setDescription(data.flavor_text_entries[i].flavor_text);
          this.pokemonDataService.setPokemonDescription(
            name,
            data.flavor_text_entries[i].flavor_text
          );
          break;
        }
      }
    });
  }
  // Get move's description
  getMoveDescription(name: string) {
    if (this.pokemonDataService.moveList[name]) {
      this.movesMap[name] = this.pokemonDataService.getMoveDescriptionStatic(
        name
      );
      this.countMoves++;
    } else
      this.pokemonDataService.getMoveDescription(name).subscribe((data) => {
        this.movesMap[data.name] = data.desc;
        this.countMoves++;
      });
  }
  // Get multiple move's descriptions
  getMovesDescriptions() {
    for (let i = 0; i < this.pokemon.moves.length; i++) {
      this.getMoveDescription(this.pokemon.moves[i].name);
    }
  }
  
  // Map Move -> Type -> Color (ex. Vine-whip -> "grass": "#78C850")
  getTypeColorByMove(move: string) {
    return this.typesMap[this.moveTypeMap[move]];
  }
  // Map Move to Type (ex. Vine-whip -> grass)
  getTypeByMove(move: string) {
    return this.moveTypeMap[move];
  }
  */
}
