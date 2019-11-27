import {TestBed} from '@angular/core/testing';
import {PlayersStore} from './players.store';

describe('PlayersStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayersStore = TestBed.get(PlayersStore);
    expect(service).toBeTruthy();
  });
});
