import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './component/app.component';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatIconModule,
  MatInputModule, MatOptionModule,
  MatSelectModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {ChooseTeamsComponent} from './component/choose-teams/choose-teams.component';
import {ManagePlayersComponent} from './component/manage-players/manage-players.component';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { PlayerRatingComponent } from './component/player-rating/player-rating.component';
import { PlayerPositionComponent } from './component/player-position/player-position.component';
import { PlayerCardComponent } from './component/player-card/player-card.component';

const routes: Routes = [
  {
    path: 'choose-teams',
    component: ChooseTeamsComponent
  },
  {
    path: 'manage-players',
    component: ManagePlayersComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/choose-teams'
  }
];

@NgModule({
  declarations: [AppComponent, ChooseTeamsComponent, ManagePlayersComponent, PlayerRatingComponent, PlayerPositionComponent, PlayerCardComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatChipsModule,
    FlexLayoutModule,

    RouterModule.forRoot(routes),
    AkitaNgDevtools.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
