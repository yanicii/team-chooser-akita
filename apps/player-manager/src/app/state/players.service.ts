import {Injectable} from '@angular/core';
import {PlayersStore} from './players.store';
import {Player} from '../model/player.model';
import {PlayersHttpService} from './players-http.service.service';
import {take} from 'rxjs/operators';

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
      .pipe(take(1))
      .subscribe(players => this.store.add(players));
  }

  add(players: Player[]): void {
    this.http
      .add(players)
      .pipe(take(1))
      .subscribe(addedPlayers => this.store.add(addedPlayers));
  }

  remove(id: string): void {
    this.http
      .remove(id)
      .pipe(take(1))
      .subscribe(() => this.store.remove(id));
  }

  updateRating(id: string, rating: number): void {
    this.http
      .update(id, rating)
      .pipe(take(1))
      .subscribe(updatedRating => this.store.update(id, {rating: updatedRating}));
  }

}
