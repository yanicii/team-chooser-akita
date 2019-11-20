import {TestBed} from '@angular/core/testing';
import {TeamsQuery} from './teams.query.service';


describe('Teams.QueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamsQuery = TestBed.get(TeamsQuery);
    expect(service).toBeTruthy();
  });
});
