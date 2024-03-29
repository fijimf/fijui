import { Component, OnInit } from '@angular/core';
import { QuoteServiceService } from '../../services/quote-service.service';
import { Inject } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [NgIf],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quote: any;

  constructor(@Inject(QuoteServiceService) private quoteService: QuoteServiceService) { }

  ngOnInit() {
    this.quoteService.getQuote().subscribe(data => {
      this.quote = data;
    });
  }
}