let DATA = [
  {id:1,value:10,name:"Kaz", isVisible:'true'},
  {id:2,value:5,name:"Rus", isVisible:'true'},
  {id:3,value:3,name:"Kyr", isVisible:'true'},
  {id:4,value:1,name:"Ukr", isVisible:'true'}
]

const listItems = d3.select('ul')
                    .selectAll('li')
                    .data(DATA, (data)=>data.name)
                    .enter()
                    .append('li');

listItems.append('span')
          .text((data)=>data.name);


const xScale = d3.scaleBand()
                 .domain(DATA.map( (dp) => dp.name )).rangeRound([0,250]).padding(0.1);

const yScale = d3.scaleLinear().domain([0,12]).rangeRound([0,200]);


const container = d3.select("svg")
                    .append('g')
                    .call(d3.axisBottom(xScale))
                    .attr('color','#DD1111')
                    
const update = (initialData = DATA) => {
  
  container
      .selectAll(".bar")
      .data(initialData)
      .enter()
      .append('rect')
      .classed('bar',true)
      .attr('width',xScale.bandwidth())
      .attr('height',data=>yScale(data.value))
      .attr('x',data=>xScale(data.name))
      .attr('y', data=>200-yScale(data.value));
}


update()


listItems
        .append('input')
        .attr('type','checkbox')
        .attr('checked',true)
        .attr('id',(data) => data.id)
        .on('change', (event)=>{

          cid = parseInt(event.target.id);
          DATA[cid-1].isVisible = event.target.checked

          const filtered = DATA.filter(i => i.isVisible !== false)
          
          d3.selectAll(".bar").remove()
          update(filtered)
             
        });


const M = d3.scaleBand()
            .domain(['Jan','Feb','Mar','Apr','May'])
            .range([1,2]);


