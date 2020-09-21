// Pokemon's special ability
export class Ability {
  name: string;
  url: string;

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.url = data.url || '';
  }
}
