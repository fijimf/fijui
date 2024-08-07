import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { GameSnapshot } from './game.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.apiUrl}/season`);
  }

  getSeason(id: string): Observable<SeasonMonth[]> {
    return this.http.get<SeasonMonth[]>(`${this.apiUrl}/season/${id}`);
  }

  getDate(yyyy: string, yyyymmdd: string): Observable<object[]> {
    return this.http.get<GameSnapshot[]>(`${this.apiUrl}/season/${yyyy}/${yyyymmdd}`);
  }
}

export class Season {
  id: number;
  year: number;
  games: number;
  teams: number;
  conferences: number;
  firstGame: string;
  lastGame: string;
  lastUpdated: string;

  constructor(id: number, year: number, games: number, teams: number, conferences: number, firstGame: string, lastGame: string, lastUpdated: string) {
    this.id = id;
    this.year = year;
    this.games = games;
    this.teams = teams;
    this.conferences = conferences;
    this.firstGame = firstGame;
    this.lastGame = lastGame;
    this.lastUpdated = lastUpdated;

  }
}
export class SeasonMonth {
  month: string;
  year: number;
  firstOfMonth: number;
  dates: SeasonDate[];
  constructor(month: string, year: number, firstOfMonth: number, dates: SeasonDate[]) {
    this.month = month;
    this.year = year;
    this.firstOfMonth = firstOfMonth;
    this.dates = dates;
  }
}
export class SeasonDate {
  day: number;
  dateKey: number;
  games: number;
  constructor(day: number, dateKey: number, games: number) {
    this.day = day;
    this.dateKey = dateKey;
    this.games = games;
  }
}




