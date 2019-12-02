import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {createPlayer, Player} from '../../model/player.model';
import {PlayersQuery} from '../../state/players.query';
import {PlayersService} from '../../state/players.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.scss']
})
export class ManagePlayersComponent {

  playerForm: FormGroup;

  allPlayers$: Observable<Player[]>;

  constructor(private playersQuery: PlayersQuery,
              private playersService: PlayersService,
              private formBuilder: FormBuilder) {
    this.initFormGroup();
    this.allPlayers$ = this.playersQuery.selectAll();
  }

  addPlayer(): void {
    const name = this.playerForm.value.name;
    if (name) {
      this.playersService.add([createPlayer(name, 0)]);
      this.playerForm.reset();
    }
  }

  updatePlayerRating(playerId: string, rating: number): void {
    this.playersService.updateRating(playerId, rating);
  }

  removePlayer(playerId: string): void {
    this.playersService.remove(playerId);
  }

  private initFormGroup(): void {
    this.playerForm = this.formBuilder.group({
      name: ['']
    })
  }

}
