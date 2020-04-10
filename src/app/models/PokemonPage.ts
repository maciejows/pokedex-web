export class PokemonPage {
  count: string;
  next: string;
  previous: string;
  results: {name: string, url: string}[];
  constructor(props: any) {
		Object.assign(this, props);
  }
}
