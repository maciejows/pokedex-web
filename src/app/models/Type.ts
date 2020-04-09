// Pokemon's type (ex. Poison)
export class Type {
  name: string;
  url: string;

  constructor(properties: any) {
    this.name = properties.name;
    this.url = properties.url;
  }

}
