import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  private breadcrumbsSubject = new Subject<Breadcrumb[]>();
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();
  constructor() {
  }

  setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }


}

export class Breadcrumb {
  label!: string;
  path!: string;
}
