import { Component } from '@angular/core';
import { QuoteComponent } from "../quote/quote.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [QuoteComponent]
})
export class HeaderComponent {

}
