var margin = 200;
var svg = d3.select("svg");
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

svg.append("text")
    .attr("transform","translate(100,0)")
    .attr("x",50)
    .attr("y",50)
    .attr("class","title")
    .text("Some data at the Bar");

var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height,0]);

var g = svg.append("g");
g.attr("transform","translate(100,100)");

var data = [
    {year:2010, val: 6},
    {year:2011, val: 14},
    {year:2012, val: 21},
    {year:2013, val: 34},
    {year:2014, val: 56},
    {year:2016, val: 45},
    {year:2017, val: 57},
    {year:2019, val: 61},
];

var tooltip = d3.select("body")
    .append("div")
    .attr("id", "mytooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("display", "none")

xScale.domain(data.map(function(d) { return d.year;}));
yScale.domain([0,d3.max(data, function(d) {return d.val;})]);

g.append("g")
    .attr("transform","translate(0,"+height+")")
    .call(d3.axisBottom(xScale));


g.append("g")
    .call(d3.axisLeft(yScale));

function onMouseOver(d,i) {
    d3.select(this)
        .style("cursor", "pointer")
        .attr('class','highlight');

    d3.select("#mytooltip")
        .style("top", (d3.event.pageY-10)+"px")
        .style("left", (d3.event.pageX+20)+"px")

        .style("display", "block")//set style to it
        .html("Year:"+d3.select(this).attr('year')+"<br>"+"Value:"+d3.select(this).attr('value'))


}

function onMouseOut(d,i) {
    d3.select(this)
        .attr('class','bar');

    d3.select("#mytooltip")
        .style("display", "none")
}


g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class","bar")
    .attr("x", (d)=>xScale(d.year))
    .attr("y", (d)=>yScale(d.val))
    .attr("year", (d)=>d.year)
    .attr("value", (d)=>d.val)
    .on("mouseover", onMouseOver)
    .on("mouseout", onMouseOut)

    .attr("width", xScale.bandwidth())
    .transition()
    .ease(d3.easeLinear)
    .duration(500)
    .delay((d,i)=>i*50)
    .attr("height", (d)=>height-yScale(d.val));


