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
  description: string;

  constructor(data: any){
    this.id = data.id;
    this.name = data.name;
    for(let i = 0; i < data.abilities.length; i++){
      this.abilities.push(new Ability(data.abilities[i]));
    }
    // Get only moves that can be learned by 'level-up'
    for(let i = 0; i < data.moves.length; i++){
      for (let j=0; j< data.moves[i].version_group_details.length; j++){
        if (data.moves[i].version_group_details[j].move_learn_method.name === "level-up") {
          this.moves.push(new Move(data.moves[i]));
          break;
        }
      }
    }
    this.sprites = new Sprites(data.sprites);

    for(let i = 0; i < data.stats.length; i++){
      this.stats.push(new Stat(data.stats[i]));
    }
    for(let i = 0; i < data.types.length; i++){
      this.types.push(new Type(data.types[i]));
    }
  }

  setDescription(desc: string){
    this.description = desc;
  }
}
