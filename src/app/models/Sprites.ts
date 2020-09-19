// Appearance of pokemon
export class Sprites {
  frontDefault: string;
  frontShiny: string;

  constructor(data: any = {}) {
    this.frontDefault = data.front_default || '';
    this.frontShiny = data.front_shiny || '';
  }
}
