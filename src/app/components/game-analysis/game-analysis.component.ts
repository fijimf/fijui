import { Component } from '@angular/core';
import { GameSnapshot, GameService } from '../../services/game.service';
import { TeamSnapshotComponent } from '../team-snapshot/team-snapshot.component';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Head2headplotComponent } from '../head2headplot/head2headplot.component';

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
  game: GameSnapshot | undefined;

  constructor(gameService: GameService, route: ActivatedRoute) {
    this.gameService = gameService;
    this.id = route.snapshot.params['gameId'];
    this.game = undefined;
  }

  ngOnInit() {
    this.gameService.getGame(this.id).subscribe(data => {
      this.game = data;
    });
  }

}
