import {Injectable} from '@angular/core';
import {PlayersQuery} from './players.query';
import {Observable} from 'rxjs';
import {Player} from '../model/player.model';
import {combineQueries, ID, QueryEntity} from '@datorama/akita';
import {TeamsState, TeamsStore} from './teams.store';
import {map} from 'rxjs/operators';
import {Team} from '../model/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsQuery extends QueryEntity<TeamsState> {

  playerIdsChosen$: Observable<ID[]> = this.select('playerIdsChosen');

  constructor(private teamsStore: TeamsStore,
              private playersQuery: PlayersQuery) {
    super(teamsStore);
  }

  selectAvailablePlayers(): Observable<Player[]> {
    return combineQueries([
      this.playersQuery.selectAll(),
      this.playerIdsChosen$
    ]).pipe(
      map(([allPlayers, chosenPlayers]) => {
        return allPlayers.filter(player => !chosenPlayers.includes(player.id as string))
      })
    )
  }

  selectAllTeams(): Observable<Team[]> {
    return combineQueries([
      this.selectAll(),
      this.playersQuery.selectAll({asObject: true})
    ]).pipe(
      map(([allTeams, allPlayers]) => {
        return allTeams.map((team: Team) => {
          return {
            ...team,
            players: team.players.map(playerId => allPlayers[playerId as ID])
          };
        })
      }));
  }

}
