import { Component, OnInit } from '@angular/core';
import { Quote, QuoteService } from '../../services/quote.service';
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
  quote: Quote = new Quote(0, '', '', '', '');

  constructor(@Inject(QuoteService) private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuote().subscribe(data => {
      this.quote = data;
    });
  }
}