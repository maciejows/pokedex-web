// Pokemon's type (ex. Poison)
export class Type {
  name: string;
  url: string;

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.url = data.url || '';
  }
}
