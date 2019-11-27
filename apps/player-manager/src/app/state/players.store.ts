import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Player} from '../model/player.model';

export interface PlayersState extends EntityState<Player> {
}

const initialState: PlayersState = {};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'players'
})
export class PlayersStore extends EntityStore<PlayersState, Player> {

  constructor() {
    super(initialState);
  }

}
