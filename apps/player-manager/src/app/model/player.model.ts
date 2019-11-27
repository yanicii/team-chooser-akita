import {guid, ID} from '@datorama/akita';

export interface Player {
  id: ID;
  name: string;
  position: string;
  rating: number;
}

export function createPlayer(name: string, rating: number, position: string): Player {
  return {
    id: guid(),
    name,
    rating,
    position
  }
}
