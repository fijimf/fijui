import { Component, Inject } from '@angular/core';
import { GameSnapshot, GameService } from '../../services/game.service';
import { TeamSnapshotComponent } from '../team-snapshot/team-snapshot.component';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Head2headplotComponent } from '../head2headplot/head2headplot.component';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-game-analysis',
  standalone: true,
  providers: [],
  templateUrl: './game-analysis.component.html',
  styleUrl: './game-analysis.component.css',
  imports: [MatCardModule, MatListModule, CommonModule, TeamSnapshotComponent, Head2headplotComponent]
})
export class GameAnalysisComponent {
  gameService: GameService;
  id: number;
  year: string;
  date: string;
  game: GameSnapshot | undefined;

  constructor(gameService: GameService, route: ActivatedRoute, @Inject(BreadcrumbsService) private breadcrumbService: BreadcrumbsService) {
    this.gameService = gameService;
    this.id = route.snapshot.params['gameId'];
    this.year = route.snapshot.params['season'];
    this.date = route.snapshot.params['yyyymmdd'];
    this.game = undefined;
  }

  ngOnInit() {

    this.gameService.getGame(this.id).subscribe(data => {
      this.game = data;
      this.breadcrumbService.setBreadcrumbs([
        { label: "DeepFij", path: "/" },
        { label: 'Games', path: '/games' },
        { label: this.year || "", path: '/games/' + this.year },
        { label: this.date || "", path: '/games/' + this.year + "/" + this.date },
        { label: this.game?.slug || "", path: '/games/' + this.year + "/" + this.date + "/" + this.id }

      ]);
    });

  }

}
