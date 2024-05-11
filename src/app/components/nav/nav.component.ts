import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  public links: Link[];
  constructor() {
    this.links = [];
  }
}

export class Link {
  path: string;
  label: string;

  constructor(path: string, label: string) {
    this.path = path;
    this.label = label;
  }
}
