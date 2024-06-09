import { Component, OnInit } from '@angular/core';
import { Season, SeasonsService } from '../../services/seasons.service';
import { Inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [NgFor],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})

export class SeasonsComponent implements OnInit {
  seasons: Season[] = [];
  constructor(@Inject(SeasonsService) private seasonsService: SeasonsService,
    @Inject(BreadcrumbsService) private breadcrumbService: BreadcrumbsService) { }

  ngOnInit() {
    this.seasonsService.getSeasons().subscribe(data => {
      this.seasons = data;
    });
    this.breadcrumbService.setBreadcrumbs([
      { label: "DeepFij", path: "/" },
      { label: 'Games', path: '/games' },

    ]);
  }
}
