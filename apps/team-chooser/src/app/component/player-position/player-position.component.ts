import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'player-position',
  templateUrl: './player-position.component.html'
})
export class PlayerPositionComponent {

  @Input() position: string;
  @Output() positionChanged: EventEmitter<string> = new EventEmitter<string>();

}
