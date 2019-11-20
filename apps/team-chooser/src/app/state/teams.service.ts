import {Injectable} from '@angular/core';
import {TeamsStore} from './teams.store';
import {TeamsQuery} from './teams.query';
import {createTeam, Team} from '../model/team.model';
import {arrayAdd, ID} from '@datorama/akita';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private store: TeamsStore,
              private teamsQuery: TeamsQuery) {
  }

  add(): void {
    const name = `Team #${this.teamsQuery.getCount() + 1}`
    this.store.add(createTeam(name));
  }

  remove(): void {
    this.teamsQuery.selectLast()
      .pipe(take(1))
      .subscribe(team => {
        this.store.remove(team.id);
      });
  }

  reset(): void {
    this.store.reset();
  }

  setFirstTeamActive(): void {
    this.teamsQuery.selectFirst()
      .pipe(take(1))
      .subscribe(team => {
        this.store.setActive(team.id);
      });
  }

  setNextTeamActive(): void {
    this.store.setActive({next: true})
  }

  addPlayerToActiveTeam(playerId: ID): void {
    const team = this.teamsQuery.getActive() as Team;
    this.store.update(team.id, {
      players: arrayAdd(team.players, playerId)
    });
    this.store.update(state => ({
      playerIdsChosen: arrayAdd(state.playerIdsChosen, playerId)
    }))
  }

}
