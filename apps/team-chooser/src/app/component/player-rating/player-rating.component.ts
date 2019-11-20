import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'player-rating',
  templateUrl: './player-rating.component.html'
})
export class PlayerRatingComponent {

  @Input() rating: number;
  @Input() editable = false;
  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();

  loopNumbers = Array(5).fill(0);

  iconClicked(index: number) {
    if (this.editable) {
      this.ratingChanged.emit(index + 1);
    }
  }

}
