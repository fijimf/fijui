import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-season',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './season.component.html',
  styleUrl: './season.component.css'
})
export class SeasonComponent {
  season!: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.season = params['season'];
    });
  }

}
