import {Injectable} from '@angular/core';
import {PlayersStore} from './players.store';
import {Player} from '../model/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private store: PlayersStore) { }

  add(players: Player[]): void {
    this.store.add(players);
  }

  remove(id: string): void {
    this.store.remove(id);
  }

  updateRating(id: string, rating: number): void {
    this.store.update(id, {rating})
  }

  updatePosition(id: string, position: string): void {
    this.store.update(id, {position})
  }

}
