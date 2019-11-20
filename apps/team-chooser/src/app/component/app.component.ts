import { Component } from '@angular/core';
import {PlayersService} from '../state/players.service';
import {INITIAL_PLAYERS} from '../state/players.data';

@Component({
  selector: 'team-chooser-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(playersService: PlayersService) {
    playersService.add(INITIAL_PLAYERS);
  }

  navLinks = [
    {path: 'choose-teams', label: 'Choose Teams'},
    {path: 'manage-players', label: 'Manage Players'}
  ];

}
