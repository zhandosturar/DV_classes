// style of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// svg
var svg = d3.select("#root")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



const data = new Array(60).fill().map((e,i) => {
    let random_x = Math.round(Math.random() * 100)
    let random_y = Math.round(Math.random() * 100)
    return {X: random_x, Y:random_y}
});

document.getElementById('code__data').textContent = JSON.stringify(data, undefined, 2);


  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.X); } )
      .attr("cy", function (d) { return y(d.Y); } )
      .attr("r", 1.5)
      .style("fill", "#1C428F")