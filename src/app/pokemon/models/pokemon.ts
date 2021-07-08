import { PokemonDetail } from './pokemon-detail';

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  detail?: PokemonDetail;
}
