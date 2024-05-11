import { Component, Input, SimpleChanges } from '@angular/core';
import { GameSnapshot, TeamSnapshot } from '../../services/game.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-head2headplot',
  standalone: true,
  imports: [],
  templateUrl: './head2headplot.component.html',
  styleUrl: './head2headplot.component.css'
})
export class Head2headplotComponent {

  @Input() game!: GameSnapshot | undefined;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['game'] && changes['game'].currentValue) {
      var margin = { top: 20, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
        .style("background-color", "gray");

      // Add X axis
      var x = d3.scaleLinear()
        .domain([20, 120])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([20, 120])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add top & right axis
      svg.append("g")
        .call(d3.axisTop(x));
      svg.append("g")
        .attr("transform", "translate(" + width + " ,0)")
        .call(d3.axisRight(y));

      //Add over/under line
      addOverUnderLine(this.game);

      //Add spread line
      addSpreadLine(this.game);



      addImpliedResult(this.game);

      addTeamStats(this.game?.homeSnapshot, true);
      addTeamStats(this.game?.awaySnapshot, false);

      addActualResult(this.game);
    }

    function addTeamStats(team: TeamSnapshot | undefined, isHome: boolean = true) {
      if (team == undefined) return;
      var pts = [{ x: team.pointsForAvg, y: team.pointsAgainstAvg }];
      svg.append("g")
        .selectAll("dot")
        .data(pts)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 3)
        .style("fill", "#" + team.team.color);

      var lns = isHome ?
        [{ x: [team.pointsForQ1, team.pointsForQ3], y: [team.pointsAgainstAvg, team.pointsAgainstAvg] }]
        : [{ x: [team.pointsForAvg, team.pointsForAvg], y: [team.pointsAgainstQ1, team.pointsAgainstQ3] }];
      svg.append("g")
        .selectAll("qline")
        .data(lns)
        .enter()
        .append("line")
        .attr("x1", function (d) { return x(d.x[0]) })
        .attr("x2", function (d) { return x(d.x[1]) })
        .attr("y1", function (d) { return y(d.y[0]) })
        .attr("y2", function (d) { return y(d.y[1]) })
        .attr("stroke", "#" + team.team.color);

      var lns = isHome ?
        [{ x: [team.pointsAgainstQ1, team.pointsAgainstQ3], y: [team.pointsForAvg, team.pointsForAvg] }]
        : [{ x: [team.pointsForAvg, team.pointsForAvg], y: [team.pointsAgainstQ1, team.pointsAgainstQ3] }];
      svg.append("g")
        .selectAll("qline")
        .data(lns)
        .enter()
        .append("line")
        .attr("x1", function (d) { return x(d.x[0]) })
        .attr("x2", function (d) { return x(d.x[1]) })
        .attr("y1", function (d) { return y(d.y[0]) })
        .attr("y2", function (d) { return y(d.y[1]) })
        .attr("stroke", "#" + team.team.color);


      svg.append("g")
        .selectAll("conf95")
        .data([{ x: team.pointsForAvg, y: team.pointsAgainstAvg, rx: team.c95majorAxis, ry: team.c95minorAxis, r: team.c95angle }])
        .enter()
        .append("ellipse")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("rx", function (d) { return d.x; })
        .attr("ry", function (d) { return d.y; })
        .attr("transform", function (d) { return "rotate(" + d.r + "," + x(d.x) + "," + y(d.y) + ")"; })
        .style("fill", "#" + team.team.color)
        .style("fill-opacity", 0.25)
        .style("stroke", "#" + team.team.color)
        .style("stroke-dasharray", ("3, 3"));
    }

    function addActualResult(game: GameSnapshot | undefined = undefined) {
      var home = game?.homeScore ?? 0;
      var away = game?.awayScore ?? 0;
      var title = ["Result " + game?.date,
      game?.homeSnapshot?.team?.name + " " + home,
      game?.awaySnapshot?.team?.name + " " + away]
      var pts = [{ x: home, y: away, title: title }];

      const tooltip = svg
        .append("text")
        .attr("class", "tooltip")
        .attr("fill", "black")
        .style("font-size", "9px")
        .style("font-family", "Roboto");

      svg.append("g")
        .selectAll("dot")
        .data(pts)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .style("fill", "#9f9")
        .on("mouseenter", (evt, d) => {
          const [mx, my] = d3.pointer(evt);
          const tooltipText = title;

          tooltip
            .attr("transform", `translate(${mx}, ${my})`)
            .selectAll("tspan")
            .data(d.title)
            .join("tspan")
            .attr("dy", "1.1em")
            .attr("x", "0px")
            .text((text) => text)
            .attr("filter", "drop-shadow(1px 1px 1px white)");
        })
        .on("mouseout", () => tooltip.selectAll("tspan").remove());
    }

    function addImpliedResult(game: GameSnapshot | undefined = undefined) {
      if (game == undefined) return;

      var home = (game.spread + game.overUnder) / 2;
      var away = (game.overUnder - game.spread) / 2;
      var pts = [{ x: home, y: away }];
      svg.append("g")
        .selectAll("dot")
        .data(pts)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 5)
        .style("stroke", "black")
        .style("fill", "gray");
    }


    function addSpreadLine(game: GameSnapshot | undefined = undefined) {
      var h = game?.spread ?? 0;
      var pts = spreadLineDef(h, { min: 20, max: 120 });
      svg.append("g")
        .append("line")
        .attr("x1", x(pts[0].x))
        .attr("x2", x(pts[1].x))
        .attr("y1", y(pts[0].y))
        .attr("y2", y(pts[1].y))
        .attr("stroke", "black");
    }

    function spreadLineDef(spread: number, range: { min: number, max: number }) {
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
          .attr("x1", x(pts[0].x))
          .attr("x2", x(pts[1].x))
          .attr("y1", y(pts[0].y))
          .attr("y2", y(pts[1].y))
          .attr("stroke", "black");
      }

      function ouLineDef(overUnder: number, range: { min: number, max: number }) {
        if (overUnder <= range.max + range.min) {
          return [{ x: range.min, y: overUnder - range.min }, { x: overUnder - range.min, y: range.min }];
        } else {
          return [{ x: overUnder - range.max, y: range.max }, { x: range.max, y: overUnder - range.max }];
        }
      }
    }
  }
}