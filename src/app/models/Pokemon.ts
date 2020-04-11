import { Ability } from './Ability';
import { Move } from './Move';
import { Sprites } from './Sprite';
import { Stat } from './Stat';
import { Type } from './Type';

// Pokemon class represents single Pokemon
export class Pokemon {
  id: number;
  name: string;
  abilities: Ability[] = [];
  moves: Move[] = [];
  sprites: Sprites;
  stats: Stat[] = [];
  types: Type[] = [];

  constructor(data: any){
    this.id = data.id;
    this.name = data.name;
    for(let i = 0; i < data.abilities.length; i++){
      this.abilities.push(new Ability(data.abilities[i]));
    }

    for(let i = 0; i < data.moves.length; i++){
      this.moves.push(new Move(data.moves[i]));
    }
    this.sprites = new Sprites(data.sprites);

    for(let i = 0; i < data.stats.length; i++){
      this.stats.push(new Stat(data.stats[i]));
    }
    for(let i = 0; i < data.types.length; i++){
      this.types.push(new Type(data.types[i]));
    }

  }
}
