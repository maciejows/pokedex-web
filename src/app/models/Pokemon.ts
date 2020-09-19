import { Ability } from './Ability';
import { Move } from './Move';
import { Sprites } from './Sprites';
import { Stat } from './Stat';
import { Type } from './Type';

// Pokemon class represents single Pokemon
export class Pokemon {
  id: number;
  name: string;
  abilities: Ability[];
  sprites: Sprites;
  moves: Move[];
  stats: Stat[];
  types: Type[];
  description: string;

  constructor(data: any = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.abilities = (data.abilities || []).map(
      (el) => new Ability(el.ability)
    );
    this.sprites = new Sprites(data.sprites);
    this.moves = [];
    // Get only moves that can be learned by level-up
    if (data.moves) {
      data.moves.forEach((move) => {
        for (const detail of move.version_group_details) {
          if (detail.move_learn_method.name === 'level-up') {
            this.moves.push(new Move(move.move));
            break;
          }
        }
      });
    }
    this.stats = (data.stats || []).map((el) => new Stat(el)) || [];
    this.types = (data.types || []).map((el) => new Type(el.type)) || [];
    this.description = data.description || '';
  }
}
