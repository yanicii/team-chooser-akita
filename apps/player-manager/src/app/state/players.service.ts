import {Injectable} from '@angular/core';
import {PlayersStore} from './players.store';
import {Player} from '../model/player.model';
import {PlayersHttpService} from './players-http.service.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private store: PlayersStore,
              private http: PlayersHttpService) {
  }

  getAll(): void {
    this.http
      .getAll()
      .subscribe(players => this.store.add(players));
  }

  add(players: Player[]): void {
    this.http
      .add(players)
      .subscribe(addedPlayers => this.store.add(addedPlayers));
  }

  remove(id: string): void {
    this.http
      .remove(id)
      .subscribe(() => this.store.remove(id));
  }

  updateRating(id: string, rating: number): void {
    this.http
      .update(id, rating)
      .subscribe(updatedRating => this.store.update(id, {rating: updatedRating}));
  }

}
