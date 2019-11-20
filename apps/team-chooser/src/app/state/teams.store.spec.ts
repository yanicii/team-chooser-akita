import { TestBed } from '@angular/core/testing';
import {TeamsStore} from './teams.store.service';


describe('Teams.StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamsStore = TestBed.get(TeamsStore);
    expect(service).toBeTruthy();
  });
});
