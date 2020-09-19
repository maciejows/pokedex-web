import { Type } from '@models/Type';

// Pokemon's moves
export class Move {
  name: string;
  url: string;
  description: string;
  types: Type[];

  constructor(data: any = {}) {
    this.name = data.name;
    this.url = data.url;
  }
}
