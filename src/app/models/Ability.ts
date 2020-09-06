// Pokemon's special ability
export class Ability {
  name: string;
  url: string;
  id: number;
  description: string;
  constructor(properties: any) {
    this.name = properties.ability.name;
    this.url = properties.ability.url;
  }

  setDescription(desc: string) {
    this.description = desc;
  }
}
