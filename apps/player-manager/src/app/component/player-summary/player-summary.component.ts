import {Component} from '@angular/core';
import {PlayersQuery} from '../../state/players.query';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'player-summary',
  templateUrl: './player-summary.component.html'
})
export class PlayerSummaryComponent {

  averageRating: Observable<number>;
  playerTotal: Observable<number>;

  constructor(query: PlayersQuery) {
    this.playerTotal = query.selectCount();
    this.averageRating = query.selectAll().pipe(
      map(players => players
        .map(player => player.rating)
        .reduce((accumulator, currentValue) => accumulator + currentValue) / query.getCount()
      )
    );
  }

}
