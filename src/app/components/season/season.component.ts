import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { Inject } from '@angular/core';
import { SeasonsService } from '../../services/seasons.service';


@Component({
  selector: 'app-season',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './season.component.html',
  styleUrl: './season.component.css'
})
export class SeasonComponent {
  season!: string;


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
  }

}
