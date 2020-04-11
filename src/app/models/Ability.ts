// Pokemon's special ability
// TODO: URL Extend - Ability description purposes
export class Ability {
  name: string;
  url: string;
  id: number;

  constructor(properties: any) {
    this.name = properties.ability.name;
    this.url = properties.ability.url;
  }

}
