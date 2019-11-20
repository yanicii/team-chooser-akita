import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '../../model/player.model';
import {TeamsQuery} from '../../state/teams.query';
import {TeamsService} from '../../state/teams.service';
import {Team} from '../../model/team.model';
import {ID} from '@datorama/akita';

@Component({
  selector: 'choose-teams',
  templateUrl: './choose-teams.component.html',
  styleUrls: ['./choose-teams.component.scss']
})
export class ChooseTeamsComponent implements OnInit {

  maxTeamCount = 5;

  availablePlayers$: Observable<Player[]>;
  teams$: Observable<Team[]>;
  teamsCount$: Observable<number>;
  activeTeam$: Observable<Team>;

  constructor(private teamsQuery: TeamsQuery,
              private teamsService: TeamsService) {
    this.availablePlayers$ = teamsQuery.selectAvailablePlayers();
    this.teams$ = teamsQuery.selectAllTeams();
    this.teamsCount$ = this.teamsQuery.selectCount();
    this.activeTeam$ = this.teamsQuery.selectActive() as Observable<Team>;
  }

  ngOnInit(): void {
  }

  addTeam(): void {
    this.teamsService.add();
  }

  removeTeam(): void {
    this.teamsService.remove();
  }

  resetTeams(): void {
    this.teamsService.reset();
  }

  startChoosing(): void {
    this.teamsService.setFirstTeamActive();
  }

  choosePlayer(playerId: ID): void {
    if(this.teamsQuery.getActive() as Team) {
      this.teamsService.addPlayerToActiveTeam(playerId);
      this.teamsService.setNextTeamActive();
    }
  }

  isTeamActive(teamId: ID): boolean {
    const activeTeam = this.teamsQuery.getActive() as Team;
    if (activeTeam) {
      return teamId === activeTeam.id;
    }
  }

}
