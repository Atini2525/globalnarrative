/*var margin = {top: 20, right: 30, bottom: 40, left: 90},
  svgWidht=1000- margin.left - margin.right,
  svgHeight=2500- margin.top - margin.bottom;*/

  let xScale9;
  let yScale9;
 // svgWidht = window.innerWidth * .30,
 svgWidht1 = window.innerWidth * .30,
  svgHeight1 = window.innerHeight * 1,
   margin = {top: svgHeight1/20, bottom: 80, left: 120, right: 10},
   radius = 3,
   default_selection = "Select a Country";
  /**
   * APPLICATION STATE
   * */
  let state9 = {
   
  };
 var  data9 = [];

 var tooltip19 = d3.select("#tooltip19")
 .append("div")
   .style("position", "absolute")
   .style("background", "white")
   .style("padding", "1rem")
   .style("border", "1px solid forestgreen")
   .style("visibility", "hidden")
   .text("");
 
   //const svg2 =d3.select('#my-svg')
   const svg9 = d3
   .select("#d3-container-9")
  .append("svg")
  .attr("width", svgWidht1 + margin.left + margin.right)
  .attr("height", svgHeight1 + margin.top + margin.bottom)
  .append("g")
 //.attr('transform','translate('+ svgWidht/2 +',0)');
 .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("1950children2020v1.csv", d3.autoType).then(raw_data9 => {
          console.log("raw_data", raw_data9);
          state9.raw_data9 = raw_data9;
          console.log(state9.raw_data9);
          init9();
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
            function init9() {
          //    var col2data9 = state9.raw_data9.map(function(d) { return d.Estimate2020 });
           //   console.log(col2data9);
              
             

          
xScale9 = d3
.scaleLinear()
.domain(d3.extent(state9.raw_data9, d => d.Estimate2020))
.range([0, 550])

svg9.append("g")
.attr("transform", "translate(0," + svgHeight1 + ")")
.call(d3.axisBottom(xScale9))
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

//const yscale =d3.scaleBand()
//.domain(state1.raw_data2.map(d=>d.Entity))
//.range([svgHeight,0])// to make a scale banc on xscale 
//.padding(.1)
const yScale9 = d3
.scaleLinear()
.domain(d3.extent(state9.raw_data9, d => d.happinessScore))
.range([svgHeight,0])
//.range([0, 550])
/*svg2.append("g")
.call(d3.axisLeft(yscale))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(45)")
.style("text-anchor", "end")
.style("font-weight", "bold");*/

var dat = d3.map();
svg9.append("g")
//.attr("transform", "translate(-10,0)rotate(45)")
.call(d3.axisLeft(yScale9))
/*.selectAll("text")

.style("text-anchor", "end")
.style("font-weight", "bold")*/
 .append("text")
.attr("class", "axis-label")
.attr("y", "50%")
.attr("dx", "-3em")
.attr("writing-mode", "vertical-rl")
.text("Fertility and Happiness Rate");


 // it's invisible and its position/contents are defined during mouseover


// build a bar 

svg9
.selectAll("circle101")
.data(state9.raw_data9)
.enter().append("circle")

 // .attr("cx", d=> xScale(d.estimate2020))
 // .attr("cy", d=> yscale(d.Entity) )
  .attr("cx", function(d) { return xScale9(d.Estimate2020); })    
  .attr("cy", function(d) { return yScale9(d.happinessScore); }) 
  .attr("r", 5.5)
  .style("fill", "#69b3a2")
  .on("mouseover", function(){return tooltip19.style("visibility", "visible");})
  .on("mousemove", function(d)
   
  {
    //console.log("d:", d)
    return tooltip19.style("top", (event.pageY + 10)+"px")
    .style("left",(event.pageX)+"px")
    .html(`<div> Country : ${d.Entity} </div> <div> Estimate Fertility: ${d.Estimate2020} </div>
    <div> Happiness Score: ${d.happinessScore}</div> `)})

  
  .on("mouseout", function(){return tooltip19.style("visibility", "hidden");})
 /* .attr("transform", d => {
    const [x, y] = projection([d.LONG, d.LAT]);
    return `translate(${x}, ${y})`;  
  });*/

var array = [{ one: "text1", two: "text2", three: 3, four: 4 }, { one: "text3", two: "text4", three: 5, four: 6 }, { one: "text5", two: "text7", three: 8, four: 9 }],
result = array.map(Object.values);
            
console.log(result);

 
};

