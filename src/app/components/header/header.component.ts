import { Component } from '@angular/core';
import { QuoteComponent } from "../quote/quote.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [QuoteComponent, CommonModule]
})
export class HeaderComponent {

}
