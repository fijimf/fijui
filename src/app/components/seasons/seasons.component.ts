import { Component, OnInit } from '@angular/core';
import { Season, SeasonsService } from '../../services/seasons.service';
import { Inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [NgFor, AgGridAngular],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})

export class SeasonsComponent implements OnInit {
  seasons: Season[] = [];
  cols: ColDef[] = [
    { field: "id", hide: true },
    { field: "year", headerName: "Year" },
    { field: "games", headerName: "# of Games", type: 'numericColumn' },
    { field: "teams", headerName: "# of Teams", type: 'numericColumn' },
    { field: "conferences", hide: true },
    { field: "firstGame", headerName: "First Game", type: 'dateColumn' },
    { field: "lastGame", headerName: "Last Game", type: 'dateColumn' },
    { field: "lastUpdated", headerName: "Updated At" },];
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
