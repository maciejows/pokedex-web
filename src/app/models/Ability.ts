// Pokemon's special ability

export class Ability {
  name: string;
  id: number;

  constructor(properties: any) {
    this.name = properties.name;
    this.id = properties.id;
  }

}
