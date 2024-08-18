import { Component, Inject, OnInit } from '@angular/core';
import { SeasonsService } from '../../services/seasons.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import moment from 'moment';


@Component({
  selector: 'app-date',
  standalone: true,
  imports: [NgFor, AgGridAngular, RouterLink],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent implements OnInit {
  year: string | undefined;
  date: string | undefined;
  prev: string | undefined;
  next: string | undefined;
  data: any = [];

  cols: ColDef[] = [];


  constructor(private route: ActivatedRoute, @Inject(SeasonsService) private seasonsService: SeasonsService,
    @Inject(BreadcrumbsService) private breadcrumbService: BreadcrumbsService) {
    this.cols = [{ field: "id", headerName: "", cellRenderer: this.createLinkRenderer(this.year!, this.date!), width: 50 },
    { field: "homeName", headerName: "Home Team", width: 250 },
    { field: "homeScore", headerName: "Score", type: 'numericColumn', width: 75 },
    { field: "awayName", headerName: "Away Team", width: 250 },
    { field: "awayScore", headerName: "Score", type: 'numericColumn', width: 75 },
    { field: "line", headerName: "Line", width: 125 },
    { field: "result", headerName: "Result", width: 100 },
    { field: "overUnder", headerName: "O/U", width: 100 },
    { field: "overUnderResult", headerName: "Result", width: 100 },];
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.year = params['season'];
      this.date = params['yyyymmdd'];
      this.updateData();
    });
  }

  private updateData() {
    this.breadcrumbService.setBreadcrumbs([
      { label: "DeepFij", path: "/" },
      { label: 'Games', path: '/games' },
      { label: this.year?.toString() || "", path: '/games/' + this.year },
      { label: this.date?.toString() || "", path: '/games/' + this.year + "/" + this.date }
    ]);

    this.seasonsService.getDate(this.year || "", this.date || "").subscribe(data => {
      this.data = data;
      const d = moment(this.date, 'YYYYMMDD');
      this.prev = d.subtract(1, 'day').format('YYYYMMDD');
      this.next = d.add(2, 'days').format('YYYYMMDD'); // Add 2 days because we subtracted 1 day before
      console.log('Prev date:', this.prev);
      console.log('Next date:', this.next);
    });
  }

  private createLinkRenderer(year: string, date: string): Function {
    return function (x: any) {
      return `<a href="/games/${year}/${date}/${x.data.id}"><i class="fa-regular fa-lightbulb"></a></i>`;
    };
  }
}

