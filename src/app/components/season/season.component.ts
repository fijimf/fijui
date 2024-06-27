import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { Inject } from '@angular/core';
import { SeasonMonth, SeasonsService } from '../../services/seasons.service';
import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { MonthCalComponent } from '../month-cal/month-cal.component';


@Component({
  selector: 'app-season',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, MonthCalComponent],
  templateUrl: './season.component.html',
  styleUrl: './season.component.css'
})
export class SeasonComponent {
  season!: string;
  months: SeasonMonth[] = [];


  constructor(private route: ActivatedRoute,
    @Inject(SeasonsService) private seasonsService: SeasonsService,
    @Inject(BreadcrumbsService) private breadcrumbService: BreadcrumbsService) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.season = params['season'];
    });
    this.breadcrumbService.setBreadcrumbs([
      { label: "DeepFij", path: "/" },
      { label: 'Games', path: '/games' },
      { label: this.season, path: '/games/' + this.season }
    ]);
    this.seasonsService.getSeason(this.season).subscribe(data => {
      this.months = data;
    });
  }

}
