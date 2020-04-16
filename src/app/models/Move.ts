// Pokemon's moves
export class Move {
  id: number;
  name: string;
  url: string;

  constructor(properties: any) {
    this.name = properties.move.name;
    this.url = properties.move.url;
  }
}
