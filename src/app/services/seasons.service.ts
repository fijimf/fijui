import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.apiUrl}/season`);
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


