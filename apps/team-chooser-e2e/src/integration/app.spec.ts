import { getGreeting } from '../support/app.po';

describe('team-chooser', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to team-chooser!');
  });
});
