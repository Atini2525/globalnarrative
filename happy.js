/*var margin = {top: 20, right: 30, bottom: 40, left: 90},
  svgWidht=1000- margin.left - margin.right,
  svgHeight=2500- margin.top - margin.bottom;*/

  let xScale;
  let yScale;
 // svgWidht = window.innerWidth * .30,
 svgWidht = window.innerWidth * .30,
  svgHeight = window.innerHeight * 1,
   margin = {top: svgHeight/20, bottom: 80, left: 80, right: 10},
   radius = 3,
   default_selection = "Select a Country";
  /**
   * APPLICATION STATE
   * */
  let state1 = {
   
  };
 var  data1 = [];

 var tooltip11 = d3.select("#tooltip11")
 .append("div")
   .style("position", "absolute")
   .style("background", "white")
   .style("padding", "1rem")
   .style("border", "1px solid forestgreen")
   .style("visibility", "hidden")
   .text("");
 
   //const svg2 =d3.select('#my-svg')
   const svg2 = d3
   .select("#d3-container-3")
  .append("svg")
  .attr("width", svgWidht + margin.left + margin.right)
  .attr("height", svgHeight + margin.top + margin.bottom)
  .append("g")
 //.attr('transform','translate('+ svgWidht/2 +',0)');
 .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("1950children2020.csv", d3.autoType).then(raw_data2 => {
          console.log("raw_data", raw_data2);
          state1.raw_data2 = raw_data2;
          console.log(state1.raw_data2);
          init();
        });
  /*d3.csv("1950children2020.csv").then(raw_data=> {
          data = raw_data;
     console.log(data);
     data2 = data.map(function (e) {
          return estimate2020=+e.estimate2020;
        });

     init1();
});*/
    
 
    //var makeVis = function(data) { 
   // Add the tooltip container to the vis container
              // it's invisible and its position/contents are defined during mouseover
            function init() {
              var col2data = state1.raw_data2.map(function(d) { return d.Estimate20201 });
              console.log(col2data);
              
             

          
xScale = d3
.scaleLinear()
.domain(d3.extent(state1.raw_data2, d => d.Estimate20201))
.range([0, 550])

svg2.append("g")
.attr("transform", "translate(0," + svgHeight + ")")
.call(d3.axisBottom(xScale))
.append("text")
.attr("class", "axis-label")
.attr("x", "70%")
.attr("dy", "3em")
 //.attr("transform", "translate(-10,0)rotate(-45)")
 .style("text-anchor", "end")
 .text("Graph of Fertility  Rate: from the most Fertile country to the less one");
/*.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");*/

const yscale =d3.scaleBand()
.domain(state1.raw_data2.map(d=>d.Entity1))
.range([svgHeight,0])// to make a scale banc on xscale 
.padding(.1)
var data = d3.map();
svg2.append("g")
.call(d3.axisLeft(yscale))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(45)")
.style("text-anchor", "end")
.style("font-weight", "bold");
 // it's invisible and its position/contents are defined during mouseover


// build a bar 

svg2
.selectAll("circle10")
.data(state1.raw_data2)
.enter().append("circle")

 // .attr("cx", d=> xScale(d.estimate2020))
 // .attr("cy", d=> yscale(d.Entity) )
  .attr("cx", function(d) { return xScale(d.Estimate20201); })    
  .attr("cy", function(d) { return yscale(d.Entity1); }) 
  .attr("r", 5.5)
  .style("fill", "#FDD023")
  .on("mouseover", function(){return tooltip11.style("visibility", "visible");})
  .on("mousemove", function(d)
   
  {
    //console.log("d:", d)
    return tooltip11.style("top", (event.pageY + 10)+"px")
    .style("left",(event.pageX)+"px")
    .html(`<div> Estimate Fertility: ${d.Estimate20201} </div>
    <div> Country: ${d.Entity1}</div>`)})

  
  .on("mouseout", function(){return tooltip11.style("visibility", "hidden");})
 /* .attr("transform", d => {
    const [x, y] = projection([d.LONG, d.LAT]);
    return `translate(${x}, ${y})`;  
  });*/

var array = [{ one: "text1", two: "text2", three: 3, four: 4 }, { one: "text3", two: "text4", three: 5, four: 6 }, { one: "text5", two: "text7", three: 8, four: 9 }],
result = array.map(Object.values);
            
console.log(result);

 
};

