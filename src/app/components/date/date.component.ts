import { Component, Inject, OnInit } from '@angular/core';
import { Season, SeasonsService } from '../../services/seasons.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
import { GameSnapshot } from '../../services/game.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [NgFor],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent implements OnInit {
  year: string | undefined;
  date: string | undefined;
  games: object[] = [];
  constructor(private route: ActivatedRoute, @Inject(SeasonsService) private seasonsService: SeasonsService,
    @Inject(BreadcrumbsService) private breadcrumbService: BreadcrumbsService) {
    this.year = this.route.snapshot.params['season'];
    this.date = this.route.snapshot.params['yyyymmdd'];
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumbs([
      { label: "DeepFij", path: "/" },
      { label: 'Games', path: '/games' },
      { label: this.year?.toString() || "", path: '/games/' + this.year },
      { label: this.date?.toString() || "", path: '/games/' + this.year + "/" + this.date }

    ]);
    this.seasonsService.getDate(this.year || "", this.date || "").subscribe(data => {
      this.games = data;
    });
  }
}

