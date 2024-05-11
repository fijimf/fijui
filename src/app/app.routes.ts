import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameAnalysisComponent } from './components/game-analysis/game-analysis.component';

export const routes: Routes = [
    //   { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'game-analysis/:id', component: GameAnalysisComponent }
];
