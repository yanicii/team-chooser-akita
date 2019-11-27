import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {PlayersState, PlayersStore} from './players.store';

@Injectable({
  providedIn: 'root'
})
export class PlayersQuery extends QueryEntity<PlayersState> {

  constructor(protected store: PlayersStore) {
    super(store);
  }

}
