import { Component } from '@angular/core';
import {PlayersService} from '../state/players.service';

@Component({
  selector: 'player-manager-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(playersService: PlayersService) {
    playersService.getAll();
  }

  navLinks = [
    {path: 'manage-players', label: 'Manage Players'}
  ];

}
