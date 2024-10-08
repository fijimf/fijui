import { Component, Input, SimpleChanges } from '@angular/core';
import { GameSnapshot, TeamGameSnapshot, TeamSnapshot } from '../../services/game.service';
import * as d3 from 'd3';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-head2headplot',
  standalone: true,
  imports: [MatCardModule, MatListModule, CommonModule],
  templateUrl: './head2headplot.component.html',
  styleUrl: './head2headplot.component.css'
})
export class Head2headplotComponent {
  toggler(key: string): (event: Event) => void {
    return (event: Event) => {
      const isChecked = (event.target as HTMLInputElement).checked;
      d3.selectAll("." + key).style("display", isChecked ? "initial" : "none");
    }
  }

  toggleWL = this.toggler('wl-line');
  toggleSprd = this.toggler('sprd-line');
  toggleOU = this.toggler('ou-line');
  toggleActual = this.toggler('actual-result');
  toggleImplied = this.toggler('implied-result');
  toggleHomeGames = this.toggler('home-games');
  toggleAwayGames = this.toggler('away-games');
  toggleHomePFPA = this.toggler('home-pfpa');
  toggleAwayPFPA = this.toggler('away-pfpa');
  toggleHomeIQR = this.toggler('home-iqr');
  toggleAwayIQR = this.toggler('away-iqr');
  toggleHome95Conf = this.toggler('home-95conf');
  toggleAway95Conf = this.toggler('away-95conf');




  @Input() game!: GameSnapshot | undefined;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['game'] && changes['game'].currentValue) {
      var margin = { top: 20, right: 30, bottom: 80, left: 110 },
        width = 640 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("background-color", "gray");

      // Add X axis
      var x = d3.scaleLinear()
        .domain([20, 120])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      var xScalefactor = width / 100;
      // Add Y axis
      var y = d3.scaleLinear()
        .domain([20, 120])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));
      var yScalefactor = height / 100;
      // Add top & right axis
      svg.append("g")
        .call(d3.axisTop(x));
      svg.append("g")
        .attr("transform", "translate(" + width + " ,0)")
        .call(d3.axisRight(y));

      addAxesLabels(this.game);

      addActualResult(this.game);

      addWinLossLine(this.game);
      addOverUnderLine(this.game);
      addSpreadLine(this.game);

      addImpliedResult(this.game);
      addGames(this.game?.homeSnapshot.games, this.game?.homeSnapshot.team.color, true);
      addGames(this.game?.awaySnapshot.games, this.game?.awaySnapshot.team.color, false);
      addTeamStats(this.game?.homeSnapshot, true);
      addTeamStats(this.game?.awaySnapshot, false);

    }

    function addTeamStats(team: TeamSnapshot | undefined, isHome: boolean = true) {
      if (team == undefined) return;
      var teamPoint = (isHome) ?
        [{ x: team.pointsForAvg, y: team.pointsAgainstAvg }] :
        [{ x: team.pointsAgainstAvg, y: team.pointsForAvg }];

      svg.append("g")
        .selectAll("dot")
        .data(teamPoint)
        .enter()
        .append("circle")
        .attr("class", isHome ? "home-pfpa" : "away-pfpa")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 3)
        .style("fill", "#" + team.team.color);

      var pfLine = isHome ? [{ p1: { x: team.pointsForQ1, y: team.pointsAgainstAvg }, p2: { x: team.pointsForQ3, y: team.pointsAgainstAvg } },
      { p1: { x: team.pointsForQ1, y: team.pointsAgainstAvg - 1.5 }, p2: { x: team.pointsForQ1, y: team.pointsAgainstAvg + 1.5 } },
      { p1: { x: team.pointsForQ3, y: team.pointsAgainstAvg - 1.5 }, p2: { x: team.pointsForQ3, y: team.pointsAgainstAvg + 1.5 } }
      ] :
        [{ p1: { x: team.pointsAgainstAvg, y: team.pointsForQ1 }, p2: { x: team.pointsAgainstAvg, y: team.pointsForQ3 } },
        { p1: { x: team.pointsAgainstAvg - 1.5, y: team.pointsForQ1 }, p2: { x: team.pointsAgainstAvg + 1.5, y: team.pointsForQ1 } },
        { p1: { x: team.pointsAgainstAvg - 1.5, y: team.pointsForQ3 }, p2: { x: team.pointsAgainstAvg + 1.5, y: team.pointsForQ3 } }
        ];
      svg.append("g")
        .selectAll("qline")
        .data(pfLine)
        .enter()
        .append("line")
        .attr("x1", function (d) { return x(d.p1.x) })
        .attr("x2", function (d) { return x(d.p2.x) })
        .attr("y1", function (d) { return y(d.p1.y) })
        .attr("y2", function (d) { return y(d.p2.y) })
        .attr("class", isHome ? "home-iqr" : "away-iqr")
        .attr("stroke", "#" + team.team.color);

      var pfLine = isHome ? [{ p1: { x: team.pointsForAvg, y: team.pointsAgainstQ1 }, p2: { x: team.pointsForAvg, y: team.pointsAgainstQ3 } },
      { p1: { x: team.pointsForAvg - 1.5, y: team.pointsAgainstQ1 }, p2: { x: team.pointsForAvg + 1.5, y: team.pointsAgainstQ1 } },
      { p1: { x: team.pointsForAvg - 1.5, y: team.pointsAgainstQ3 }, p2: { x: team.pointsForAvg + 1.5, y: team.pointsAgainstQ3 } }
      ] :
        [{ p1: { x: team.pointsAgainstQ1, y: team.pointsForAvg }, p2: { x: team.pointsAgainstQ3, y: team.pointsForAvg } },
        { p1: { x: team.pointsAgainstQ1, y: team.pointsForAvg - 1.5 }, p2: { x: team.pointsAgainstQ1, y: team.pointsForAvg + 1.5 } },
        { p1: { x: team.pointsAgainstQ3, y: team.pointsForAvg - 1.5 }, p2: { x: team.pointsAgainstQ3, y: team.pointsForAvg + 1.5 } }
        ];

      svg.append("g")
        .selectAll("qline")
        .data(pfLine)
        .enter()
        .append("line")
        .attr("class", isHome ? "home-iqr" : "away-iqr")
        .attr("x1", function (d) { return x(d.p1.x) })
        .attr("x2", function (d) { return x(d.p2.x) })
        .attr("y1", function (d) { return y(d.p1.y) })
        .attr("y2", function (d) { return y(d.p2.y) })
        .attr("stroke", "#" + team.team.color);


      svg.append("g")
        .selectAll("conf95")
        .data([{ x: teamPoint[0].x, y: teamPoint[0].y, rx: isHome ? team.c95pfAxis : team.c95paAxis, ry: isHome ? team.c95paAxis : team.c95pfAxis, r: team.c95angle }])
        .enter()
        .append("ellipse")
        .attr("class", isHome ? "home-95conf" : "away-95conf")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("rx", function (d) { return (xScalefactor) * d.rx; })
        .attr("ry", function (d) { return (yScalefactor) * d.ry; })
        .attr("transform", function (d) { return "rotate(" + d.r + "," + x(d.x) + "," + y(d.y) + ")"; })
        .style("fill", "#" + team.team.color)
        .style("fill-opacity", 0.25)
        .style("stroke", "#" + team.team.color)
        .style("stroke-dasharray", ("3, 3"));
    }

    function addGames(games: TeamGameSnapshot[] | undefined, color: string | undefined, isHomeTeam: boolean) {
      if (games == undefined) return;
      svg.append("g")
        .attr("class", isHomeTeam ? "home-games" : "away-games")
        .selectAll("gs")
        .data(games)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return isHomeTeam ? x(d.score) : x(d.oppScore); })
        .attr("cy", function (d) { return isHomeTeam ? y(d.oppScore) : y(d.score); })
        .attr("r", 4)
        .style("fill", "#" + color || "black")
        .style("filter", "brightness(1.25)");
    }

    function addActualResult(game: GameSnapshot | undefined = undefined) {
      var home = game?.homeScore ?? 0;
      var away = game?.awayScore ?? 0;
      var title = ["Result " + game?.date,
      game?.homeSnapshot?.team?.name + " " + home,
      game?.awaySnapshot?.team?.name + " " + away]
      var pts = [{ x: home, y: away, title: title }];

      svg.append("g")
        .attr("class", "actual-result")
        .selectAll("dot")
        .data(pts)
        .enter()
        .append("path")
        .attr("d", d3.symbol().type(d3.symbolAsterisk).size(200))
        .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
        .style("stroke", "black")
        .style("stroke-width", "3px")
        .style("fill", "black");
    }

    function addImpliedResult(game: GameSnapshot | undefined = undefined) {
      if (game == undefined) return;

      var home = (game.overUnder - game.spread) / 2;
      var away = (game.overUnder + game.spread) / 2;
      var pts = [{ x: home, y: away }];
      svg.append("g")
        .attr("class", "implied-result")
        .selectAll("dot")
        .data(pts)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.x) - 4; })
        .attr("y", function (d) { return y(d.y) - 4; })
        .attr("width", 8)
        .attr("height", 8)
        .style("stroke", "gray")
        .style("stroke-width", "2px")
        .style("fill", "gray");
    }

    function addWinLossLine(game: GameSnapshot | undefined) {
      svg.append("g")
        .append("line")
        .attr("class", "wl-line")
        .attr("x1", x(20))
        .attr("x2", x(120))
        .attr("y1", y(20))
        .attr("y2", y(120))
        .attr("stroke", "black")
        .attr("stroke-dasharray", ("5,2"));
      const hWins = game?.homeSnapshot.team.name + " wins/" + game?.awaySnapshot.team.name + " loses";

      svg.append("g")
        .append("text")
        .attr("class", "wl-line")
        .attr("x", x(20))
        .attr("y", y(20))
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "alphabetic")
        .attr("dy", "+1em")
        .attr("dx", "+2em")
        .attr("transform", "rotate(-45, " + x(20) + "," + y(20) + ")")
        .style("font-family", "Roboto")
        .style("font-size", "10px")
        .style("font-weight", "400")
        .text(hWins);

      const aWins = game?.awaySnapshot.team.name + " wins/" + game?.homeSnapshot.team.name + " loses";
      svg.append("g")
        .append("text")
        .attr("class", "wl-line")
        .attr("x", x(20))
        .attr("y", y(20))
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "alphabetic")
        .attr("dy", "-0.3em")
        .attr("dx", "+2em")
        .attr("transform", "rotate(-45, " + x(20) + "," + y(20) + ")")
        .style("font-family", "Roboto")
        .style("font-size", "10px")
        .style("font-weight", "400")
        .text(aWins);

    }

    function addSpreadLine(game: GameSnapshot | undefined = undefined) {
      var h = game?.spread ?? 0;
      var pts = spreadLineDef(h, { min: 20, max: 120 });

      svg.append("g")
        .append("line")
        .attr("class", "sprd-line")
        .attr("x1", x(pts[0].x))
        .attr("x2", x(pts[1].x))
        .attr("y1", y(pts[0].y))
        .attr("y2", y(pts[1].y))
        .attr("stroke", "black");

      const hSpreadTxt = h < 0 ? game?.homeSnapshot.team.name + h.toFixed(1) :
        game?.homeSnapshot.team.name + "+" + h.toFixed(1);
      svg.append("g")
        .append("text")
        .attr("class", "sprd-line")
        .attr("x", x(pts[1].x))
        .attr("y", y(pts[1].y))
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "alphabetic")
        .attr("dy", "+1em")
        .attr("dx", "-2em")
        .attr("transform", "rotate(-45, " + x(pts[1].x) + "," + y(pts[1].y) + ")")
        .style("font-family", "Roboto")
        .style("font-size", "10px")
        .style("font-weight", "400")
        .text(hSpreadTxt);
      const aSpreadTxt = h < 0 ? game?.awaySnapshot.team.name + "+" + -h.toFixed(1) :
        game?.awaySnapshot.team.name + (-h).toFixed(1);
      svg.append("g")
        .append("text")
        .attr("class", "sprd-line")
        .attr("x", x(pts[1].x))
        .attr("y", y(pts[1].y))
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "alphabetic")
        .attr("dy", "-.3em")
        .attr("dx", "-2em")
        .attr("transform", "rotate(-45, " + x(pts[1].x) + "," + y(pts[1].y) + ")")
        .style("font-family", "Roboto")
        .style("font-size", "10px")
        .style("font-weight", "400")
        .text(aSpreadTxt);
    }

    function spreadLineDef(zzz: number, range: { min: number, max: number }) {
      var spread = -zzz;
      if (spread < 0) {
        return [{ x: range.min, y: range.min - spread }, { x: range.max + spread, y: range.max }];
      } else {
        return [{ x: range.min + spread, y: range.min }, { x: range.max, y: range.max - spread }];
      }
    }

    function addOverUnderLine(game: GameSnapshot | undefined = undefined): void {
      var k = game?.overUnder ?? 0;
      if (k >= 40 && k <= 240) {
        var pts = ouLineDef(k, { min: 20, max: 120 });
        svg.append("g")
          .append("line")
          .attr("class", "ou-line")
          .attr("x1", x(pts[0].x))
          .attr("x2", x(pts[1].x))
          .attr("y1", y(pts[0].y))
          .attr("y2", y(pts[1].y))
          .attr("stroke", "black");

        svg.append("g")
          .append("text")
          .attr("class", "ou-line")
          .attr("x", x(pts[0].x))
          .attr("y", y(pts[0].y))
          .attr("text-anchor", "start")
          .attr("alignment-baseline", "alphabetic")
          .attr("dy", "-0.3em")
          .attr("dx", "+2em")
          .attr("transform", "rotate(45, " + x(pts[0].x) + "," + y(pts[0].y) + ")")
          .style("font-family", "Roboto")
          .style("font-size", "10px")
          .style("font-weight", "400")
          .text("Over " + k.toFixed(1));
        svg.append("g")
          .append("text")
          .attr("class", "ou-line")
          .attr("x", x(pts[0].x))
          .attr("y", y(pts[0].y))
          .attr("text-anchor", "start")
          .attr("alignment-baseline", "alphabetic")
          .attr("dy", "+1.0em")
          .attr("dx", "+2em")
          .attr("transform", "rotate(45, " + x(pts[0].x) + "," + y(pts[0].y) + ")")
          .style("font-family", "Roboto")
          .style("font-size", "10px")
          .style("font-weight", "400")
          .text("Under " + k.toFixed(1));
      }



      function ouLineDef(overUnder: number, range: { min: number, max: number }) {
        if (overUnder <= range.max + range.min) {
          return [{ x: range.min, y: overUnder - range.min }, { x: overUnder - range.min, y: range.min }];
        } else {
          return [{ x: overUnder - range.max, y: range.max }, { x: range.max, y: overUnder - range.max }];
        }
      }
    }


    function addAxesLabels(game: GameSnapshot | undefined) {
      svg.append("g")
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 20)
        .attr("text-anchor", "middle")
        .style("font-family", "Roboto")
        .append("tspan")
        .style("font-size", "16px")
        .style("font-weight", "400")
        .style("font-style", "italic")
        .text("HOME")
        .append("tspan")
        .attr("x", width / 2)
        .attr("dx", ".75em")
        .attr("dy", "1em")
        .style("font-size", "24px")
        .style("font-weight", "700")
        .style("font-style", "normal")
        .text(game?.homeSnapshot?.team?.name + "  " + game?.homeScore.toString());

      svg.append("g")
        .append("text")
        .attr("x", 0)
        .attr("y", (height / 2) - 30)
        .attr("transform", "rotate(-90, 0, " + height / 2 + ")")
        .attr("text-anchor", "middle")
        .style("font-family", "Roboto")
        .append("tspan")
        .style("font-size", "16px")
        .style("font-weight", "400")
        .style("font-style", "italic")
        .attr("dx", "-1em")
        .text("AWAY")
        .append("tspan").style("font-size", "24px")
        .style("font-weight", "700")
        .style("font-style", "normal")
        .attr("x", 0)
        .attr("dy", "-.85em")
        .text(game?.awaySnapshot?.team?.name + "  " + game?.awayScore.toString());
    }

  }
}



