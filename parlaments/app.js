//const items = [[],[],[],[],[],[]]

let parlamentsWithParty = []

function readTextFile(file) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        parlamentsWithParty.push(...JSON.parse(rawFile.responseText))
      }
  }
  rawFile.send(null);
}

readTextFile(window.location.origin+"/parlamentsWithParty.json");

const width = 1440;
const height = 1536;
var xScale = d3.scaleLinear().range([0,width]);
var yScale = d3.scaleLinear().range([0,height]);

var tip = d3.tip().attr("class","d3-tip").html((d)=>d);

var svg = d3.select("svg");
svg.attr("width",width);
svg.attr("height",height);
svg.attr("transform",'translate(100,50)');

svg.call(tip);

const parlaments = []

d3.json("data.json").then((data)=>{
  //console.log(data);
  var maxYScale = d3.max(
    data.map((d)=>d.length)
  );
  //console.log("maxYScale",maxYScale);
  xScale.domain([0,data.length])
  yScale.domain([0,maxYScale]);

  links = []
  for(let i = 0; i<data.length-1; i++) {
    for(let j = 0; j < data[i].length; j++) {
      for(let k = 0; k < data[i+1].length; k++) {
        
        if(data[i][j]==data[i+1][k]) {
          
          //items[i].push(j)
          /* console.log('d',data[i][j])
          console.log('i=',i,'j=',j,'k=',k) */
          links.push([
            [xScale(i),yScale(j)],
            [xScale(i+1),yScale(k)]
          ]);
          
          parlaments[data[i][j].replace(/ +/g,'').toLowerCase()] = data[i][j]
          /* parlamentsWithParty.map(item => {
            if(item.name.toLowerCase() === data[i][j].toLowerCase()){
              //parlaments.push(data[i][j] + item.part_name + item.date)
              parlaments[data[i][j]] = data[i][j] + item.part_name + item.date
            }else{
              parlaments[data[i][j]] = data[i][j]
            }
          }) */
          /* parlamentsWithParty.map(item => {
            if(item.name.toLowerCase() === data[i][j].toLowerCase()){
              //parlaments.push(data[i][j] + item.part_name + item.date)
              parlaments[data[i][j]] = data[i][j] + item.part_name + item.date
            }else{
              parlaments[data[i][j]] = data[i][j]
              
            }
          }) */
          //console.log(parlamentsWithParty)
          //console.log(data[i][j])

        }
      }
    }
  }

  
data.map((item,indexParent)  => {
  item.map((child,indexChild) => {
    parlamentsWithParty.map(p => {
      if( child.replace(/ +/g,'').toLowerCase() === p.name.replace(/ +/g,'').toLowerCase()){
        data[indexParent][indexChild] = p.name +'</br>'+ p.part_name + '</br>' + p.date
      }
    })
  })
  
})
console.log(data)

/* async function getParlamentsWithParty(){
  const res = await fetch('https://data.egov.kz/api/v4/kazakstan_respublikasy_parlame6/v2?source={%22size%22:263}&apiKey=618e1305681b425dbcd04b9617b599b8')
  return await res.json()
}*/


  var sozyvs = svg
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("class","sozyv")
  .attr("transform",(d,i)=>`translate(${xScale(i)},0)`)


  function onmouseout(d,i,e) {
    d3.select(this)
    .attr('class',"member");
    tip.hide();
  }

  function onmouseover(d,i,e) {
    d3.select(this)
    .attr('class',"hl");
    tip.show(d, e[i]);

  }

  sozyvs
  .selectAll("rect")
  .data((d,i)=>d)
  .enter()
  .append("rect")
  .attr("class","member")
  .attr("y", (d,j)=>yScale(j))
  .attr("x",0)
  .attr("width",5)
  .attr("height",5)
  .attr("name",(d,j)=>d)
  .on("mouseover",onmouseover)
  .on("mouseout",onmouseout)

  var lineGenerator = d3.line().curve(d3.curveCardinal);

  svg.selectAll("path")
  .data(links)
  .enter()
  .append('path')
  .attr("d",(d,i)=>lineGenerator(d));
});


//document.addEventListener('DOMContentLoaded', function(){
  //const rectangles = document.getElementsByClassName('sozyv')

  //rectangles[0].childNodes[0].style.backgroundColor='red'
 // console.log(document.getElementsByClassName('sozyv')[0])
  //console.log(items)
//})
