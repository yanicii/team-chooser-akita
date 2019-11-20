import {Component, Input} from '@angular/core';
import {Player} from '../../model/player.model';

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent {

  @Input() player: Player;

}
