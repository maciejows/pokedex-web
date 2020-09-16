import { Meta } from './Meta';
import { PokemonPages } from './PokemonPages';

export interface PageState {
  meta: Meta;
  currentPage: number;
  pages: PokemonPages;
  error: string;
}
