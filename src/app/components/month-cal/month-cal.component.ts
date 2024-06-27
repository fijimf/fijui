import { Component, Input } from '@angular/core';
import { SeasonMonth } from '../../services/seasons.service';
import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-month-cal',
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, RouterLink],
  templateUrl: './month-cal.component.html',
  styleUrl: './month-cal.component.css'
})
export class MonthCalComponent {
  @Input() month!: SeasonMonth;
  @Input() season!: string;
}
