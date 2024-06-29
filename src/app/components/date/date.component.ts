import { Component, Inject, OnInit } from '@angular/core';
import { SeasonsService } from '../../services/seasons.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [NgFor, AgGridAngular],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent implements OnInit {
  year: string | undefined;
  date: string | undefined;
  data: any = [];

  cols: ColDef[] = [
    { field: "id", headerName: "", cellRenderer: function (x: any) { return `<a href="#"><i class="fa-regular fa-lightbulb"></a></i>`; }, width: 50 },
    { field: "homeName", headerName: "Home Team", width: 250 },
    { field: "homeScore", headerName: "Score", type: 'numericColumn', width: 75 },
    { field: "awayName", headerName: "Away Team", width: 250 },
    { field: "awayScore", headerName: "Score", type: 'numericColumn', width: 75 },
    { field: "line", headerName: "Line", width: 125 },
    { field: "result", headerName: "Result", width: 100 },
    { field: "overUnder", headerName: "O/U", width: 100 },
    { field: "overUnderResult", headerName: "Result", width: 100 },];

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
      this.data = data;
    });
  }
}

