import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb, BreadcrumbsService } from '../../services/breadcrumbs.service';
import { BreadcrumbComponent, BreadcrumbItemComponent } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterLink, CommonModule, BreadcrumbComponent, BreadcrumbItemComponent],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: Breadcrumb[] = [];
  private bcSubscription: Subscription | undefined;

  constructor(private breadcrumbService: BreadcrumbsService) { }

  ngOnInit() {
    this.bcSubscription = this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
      console.log('breadcrumbs', this.breadcrumbs);
    });
  }

  ngOnDestroy() {
    if (this.bcSubscription) {
      this.bcSubscription.unsubscribe();
    }
  }
}
