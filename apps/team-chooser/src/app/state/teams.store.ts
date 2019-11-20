import {Injectable} from '@angular/core';
import {EntityState, EntityStore, ID, StoreConfig} from '@datorama/akita';
import {Team} from '../model/team.model';

export interface TeamsState extends EntityState<Team> {
  playerIdsChosen: ID[];
}

const initialState: TeamsState = {
  playerIdsChosen: []
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'teams',
  resettable: true
})
export class TeamsStore extends EntityStore<TeamsState> {

  constructor() {
    super(initialState);
  }

}
