import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameAnalysisComponent } from './components/game-analysis/game-analysis.component';
import { SeasonsComponent } from './components/seasons/seasons.component';
import { SeasonComponent } from './components/season/season.component';
import { DateComponent } from './components/date/date.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'games', component: SeasonsComponent },
    { path: 'games/:season', component: SeasonComponent },
    { path: 'games/:season/:yyyymmdd', component: DateComponent },
    { path: 'games/:season/:yyyymmdd/:gameId', component: GameAnalysisComponent },
];
