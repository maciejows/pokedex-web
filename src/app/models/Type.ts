// Pokemon's type (ex. Poison)
export class Type {
  name: string;
  url: string;

  constructor(properties: any) {
    this.name = properties.type.name;
    this.url = properties.type.url;
  }

}
