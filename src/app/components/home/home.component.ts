import { Component } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private breadcrumbService: BreadcrumbsService) {
    breadcrumbService.setBreadcrumbs([{ label: "DeepFij", path: "/" }]);
  }

}
