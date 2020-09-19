import { PokemonPage } from './PokemonPage';

// Interface for mapping actual page number to Pokemons for this page

export class PokemonPages {
  [key: number]: PokemonPage;

  constructor(data: any = {}) {
    let pokemons = data.pokemon || [];
    pokemons = pokemons.map((element) => element.pokemon);
    let currentPage = 1;
    const results = { results: [] };
    const total = 50;
    for (let i = 0, j = pokemons.length; i < j; i += total) {
      results.results = pokemons.slice(i, i + total);
      this[currentPage] = new PokemonPage(results);
      currentPage++;
    }
  }
}
