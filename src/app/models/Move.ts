import { Type } from '@models/Type';

// Pokemon's moves
export class Move {
  name: string;
  url: string;
  description?: string;
  type?: Type;

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.url = data.url || '';
    if (data.flavor_text_entries) {
      this.description = data.flavor_text_entries.find(
        (el) => el.language.name === 'en'
      ).flavor_text;
    }
    this.type = data.type?.name || '';
  }
}
