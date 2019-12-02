import {guid, ID} from '@datorama/akita';

export interface Player {
  id: ID;
  name: string;
  rating: number;
}

export function createPlayer(name: string, rating: number): Player {
  return {
    id: guid(),
    name,
    rating,
  }
}
