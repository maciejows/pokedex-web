// Represents single page of Pokemons
// Pokemons displaying at single page with pagination data

export class PokemonPage {
  count: string;
  next: string;
  previous: string;
  results: { name: string; url: string }[];

  constructor(props: any) {
    Object.assign(this, props);
  }
}
