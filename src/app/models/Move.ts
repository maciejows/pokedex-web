// TODO: Get only moves that can be learned by leveling move_learn_method -> name -> "level-up"
// TODO:
export class Move {
  id: number;
  name: string;
  url: string;

  constructor(properties: any) {
    this.name = properties.move.name;
    this.url = properties.move.url;
  }
}
