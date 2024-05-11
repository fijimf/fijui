import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote.service';
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

  constructor(@Inject(QuoteService) private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuote().subscribe(data => {
      this.quote = data;
    });
  }
}