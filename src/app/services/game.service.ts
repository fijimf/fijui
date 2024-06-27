import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {


  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getGame(id: number): Observable<GameSnapshot> {
    return this.http.get<any>(`${this.apiUrl}/gameSnapshot/${id}`);
  }
}

export class GameSnapshot {
  id: number;
  date: string;
  homeSnapshot: TeamSnapshot;
  homeScore: number;
  awaySnapshot: TeamSnapshot;
  awayScore: number;
  spread: number;
  overUnder: number;


  constructor(data: any) {
    this.id = data.id;
    this.date = data.date;
    this.homeSnapshot = data.homeSnapshot;
    this.homeScore = data.homeScore;
    this.awaySnapshot = data.awaySnapshot;
    this.awayScore = data.awayScore;
    this.spread = data.spread;
    this.overUnder = data.overUnder;

  }
}

export class TeamSnapshot {
  team: Team;
  asOf: string;
  record: Record;
  last5: Record;
  pointsForAvg: number;
  pointsForStdDev: number;
  pointsForQ1: number;
  pointsForQ3: number;
  pointsAgainstAvg: number;
  pointsAgainstStdDev: number;
  pointsAgainstQ1: number;
  pointsAgainstQ3: number;
  pfpaCorr: number;
  c95majorAxis: number;
  c95minorAxis: number;
  c95angle: number;

  constructor(team: Team, asOf: string, record: Record, last5: Record, pointsForAvg: number, pointsForStdDev: number, pointsForQ1: number, pointsForQ3: number, pointsAgainstAvg: number, pointsAgainstStdDev: number, pointsAgainstQ1: number, pointsAgainstQ3: number, pfpaCorr: number, c95majorAxis: number, c95minorAxis: number, c95angle: number) {
    this.team = team;
    this.asOf = asOf;
    this.record = record;
    this.last5 = last5;
    this.pointsForAvg = pointsForAvg;
    this.pointsForStdDev = pointsForStdDev;
    this.pointsForQ1 = pointsForQ1;
    this.pointsForQ3 = pointsForQ3;
    this.pointsAgainstAvg = pointsAgainstAvg;
    this.pointsAgainstStdDev = pointsAgainstStdDev;
    this.pointsAgainstQ1 = pointsAgainstQ1;
    this.pointsAgainstQ3 = pointsAgainstQ3;
    this.pfpaCorr = pfpaCorr;
    this.c95majorAxis = c95majorAxis;
    this.c95minorAxis = c95minorAxis;
    this.c95angle = c95angle;

  }
}

export class Record {
  label: string;

  wins: number;
  losses: number;

  constructor(label: string, wins: number, losses: number) {
    this.label = label;
    this.wins = wins;
    this.losses = losses;
  }
}

export class Team {
  id: number;
  key: string;
  name: string;
  nickname: string;
  conference: string = ''; // Assign a default value
  color: string;
  logo: string;
  record: string;


  constructor(id: number, key: string, name: string, nickname: string, conference: string, color: string, logo: string, record: string) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.nickname = nickname;
    this.conference = conference;
    this.color = color;
    this.logo = logo;
    this.record = record;

  }
} 