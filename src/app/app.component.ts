import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { GameAnalysisComponent } from './components/game-analysis/game-analysis.component';
import { HomeComponent } from './components/home/home.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent, GameAnalysisComponent, HomeComponent, BreadcrumbsComponent]
})
export class AppComponent {
  title = 'fijui';

}
