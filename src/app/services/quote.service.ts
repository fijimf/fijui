import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getQuote(): Observable<Quote> {
    return this.http.get<any>(`${this.apiUrl}/quote`);
  }
}

export class Quote {
  id: number;
  text: string;
  source: string;
  link: string;
  tag: string;

  constructor(id: number, text: string, source: string, link: string, tag: string) {
    this.id = id;
    this.text = text;
    this.source = source;
    this.link = link;
    this.tag = tag;
  }
}
