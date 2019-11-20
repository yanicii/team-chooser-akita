import {guid, ID} from '@datorama/akita';
import {Player} from './player.model';

export interface Team {
  id: ID;
  name: string;
  players: (ID | Player)[];
}

export function createTeam(name: string): Team {
  return {
    id: guid(),
    players: [],
    name
  }
}
