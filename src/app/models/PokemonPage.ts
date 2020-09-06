// Represents single page of Pokemons
// Pokemons displaying at single page with pagination data

export class PokemonPage {
  [name: string]: string;

  constructor(data: any = {}) {
    const results = data.results || [];
    results.forEach((element) => {
      this[element.name ? element.name : ''] = element.url ? element.url : '';
    });
  }
}
