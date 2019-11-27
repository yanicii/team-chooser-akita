import { TestBed } from '@angular/core/testing';
import {PlayersQuery} from './players.query';

describe('Players.QueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayersQuery = TestBed.get(PlayersQuery);
    expect(service).toBeTruthy();
  });
});
