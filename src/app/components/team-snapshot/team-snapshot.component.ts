import { Component, Input } from '@angular/core';
import { TeamSnapshot } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-snapshot',
  standalone: true,
  imports: [MatCardModule, MatListModule, CommonModule],
  providers: [],
  templateUrl: './team-snapshot.component.html',
  styleUrl: './team-snapshot.component.css'
})
export class TeamSnapshotComponent {
  @Input() teamSnapshot!: TeamSnapshot | undefined;
}
