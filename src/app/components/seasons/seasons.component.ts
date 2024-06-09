import { Component, OnInit } from '@angular/core';
import { Season, SeasonsService } from '../../services/seasons.service';
import { Inject } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [NgFor],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})

export class SeasonsComponent implements OnInit {
  seasons: Season[] = [];
  constructor(@Inject(SeasonsService) private seasonsService: SeasonsService) { }

  ngOnInit() {
    this.seasonsService.getSeasons().subscribe(data => {
      this.seasons = data;
    });
  }
}
