import { Component, Inject, OnInit } from '@angular/core';
import { Season, SeasonsService } from '../../services/seasons.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent implements OnInit {
  year: number | undefined;
  date: number | undefined;
  season: Season | undefined;
  constructor(private route: ActivatedRoute, @Inject(SeasonsService) private seasonsService: SeasonsService,
    @Inject(BreadcrumbsService) private breadcrumbService: BreadcrumbsService) {
    this.year = this.route.snapshot.params['year'];
    this.date = this.route.snapshot.params['yyyymmdd'];
  }

  ngOnInit() {
    // this.seasonsService.getSeason(this.year).subscribe(data => {
    //   this.season = data;
    // });
    this.breadcrumbService.setBreadcrumbs([
      { label: "DeepFij", path: "/" },
      { label: 'Games', path: '/games' },
      { label: this.year?.toString() || "", path: '/games/' + this.year },
      { label: this.date?.toString() || "", path: '/games/' + this.year + "/" + this.date }

    ]);
  }
}

