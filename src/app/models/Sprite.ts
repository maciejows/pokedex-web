// Appearance of pokemon
export class Sprites {
  front_default: string;
  front_shiny: string;
  back_default: string;
  back_shiny: string;

  constructor(properties: any) {
    this.front_default = properties.front_default;
    this.front_shiny = properties.front_shiny;
    this.back_default = properties.back_default;
    this.back_shiny = properties.back_shiny;
  }
}
