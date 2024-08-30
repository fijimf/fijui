import { Component } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private breadcrumbService: BreadcrumbsService) {
    breadcrumbService.setBreadcrumbs([{ label: "DeepFij", path: "/" }]);
  }

}
