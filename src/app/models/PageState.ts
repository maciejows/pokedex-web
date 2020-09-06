import { PokemonPages } from './PokemonPages';
import { Meta } from './Meta';

export interface PageState {
  meta: Meta;
  pages: PokemonPages;
  error: string;
}
