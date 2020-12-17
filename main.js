


 var 
//margin = {top: 20, right: 30, bottom: 40, left: 90},


  /*svgWidht=800- margin.left - margin.right,
  svgHeight=2500- margin.top - margin.bottom,*/
 //  svgWidht = window.innerWidth * .30,
 svgWidht = window.innerWidth * .30,
  svgHeight = window.innerHeight * 1,
   margin = {top: svgHeight/20, bottom: 60, left: 80, right: 30},
   radius = 3,
   default_selection = "Select a Country";

  /*svgWidht = window.innerWidth * .40,
  svgHeight = window.innerHeight * 2,
  margin = { top: height/20, bottom: 0, left: 50, right: 50};*/
  let state = {
     data: [],
     selectedParty: "All",
   };
   var data2=[];
   var tooltipp = d3.select("#tooltipp")
   .append("div")
     .style("position", "absolute")
     .style("background", "white")
     .style("padding", "1rem")
     .style("border", "1px solid forestgreen")
     .style("visibility", "hidden")
     .text("");

   const svg1 =
   d3.select('#d3-container-2')
   .append("svg")
   .attr("width", svgWidht + margin.left + margin.right)
   .attr("height", svgHeight + margin.top + margin.bottom)
   .append("g")
   .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");
   //d3.csv("happycountry2020.csv", function(error, data) {
      d3.csv("happycountry2020.csv").then(raw_data=> {
           data = raw_data;
      console.log(data);
      console.log(data.happinessScore);
      data2 = data.map(function (d) {
          console.log(state.datahappy);
          return happinessScore=+d.happinessScore;
        });
      init1();
 });
     
    function init1(){   
     //var xValue = function(d) { return (data.map(d => d.happinessScore));}; // data -> value
     var xValue = function(d) { return d["happinessScore"]};
    // var xValue = function(d) { return d.Calories;}, // data -> value

     let extractColumn = (data, happinessScore) => data.map(x=>x[happinessScore]);


     console.log(xValue);

  const xScale = d3.scaleLinear()
 .domain([0, d3.max(data.map(d => d.happinessScore))])
 .range([0, 550])
 
 svg1.append("g")
 .attr("transform", "translate(0," + svgHeight + ")")
 .call(d3.axisBottom(xScale))
// .selectAll("text")
.append("text")
.attr("class", "axis-label")
.attr("x", "70%")
.attr("dy", "3em")
 //.attr("transform", "translate(-10,0)rotate(-45)")
 .style("text-anchor", "end")
 .text("Graph of Happy Rate: from the happiest country to the less happy");
 const yscale =d3.scaleBand()
 .domain(data.map(d=>d.country))
 .range([svgHeight,0])// to make a scale banc on xscale 
 .padding(.1)
 svg1.append("g")
 .call(d3.axisLeft(yscale))
 .call(d3.axisLeft(yscale))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(45)")
.style("text-anchor", "end")
.style("font-weight", "bold");
 
 // build a bar 
 svg1
 .selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot8")
     // .attr("r", 3)
   .attr("cx", d=> xScale(d.happinessScore))
   .attr("cy", d=> yscale(d.country) )
   .attr("r",5.5)
   .style("fill", "#69b3a2")
   .on("mouseover", function(){return tooltipp.style("visibility", "visible");})
   .on("mousemove", function(d)
    
   {
     console.log("d:", d)
     return tooltipp.style("top", (event.pageY + 10)+"px")
     .style("left",(event.pageX)+"px")
    /* .html(`<div> Happniess Score: ${d.happinessScore}</div>
     <div> Country: ${d.country}</div>`)})*/
     .html(`<div> Happiness Rate: ${d.happinessScore} </div>
     <div> Country: ${d.country}</div>`)})
          .on("mouseout", function(){return tooltipp.style("visibility", "hidden");})
     /*.on("mouseout", function(d) {
          div.transition()
            .duration(500)
            .style("opacity", 0);
          });  /* svg1.selectAll("text")-*

   .data(data)
   .enter()
   .append("text")
   .text(function(d) {
        for(var i = 0; i < data.length; i++){
            return d[i].key;
        }
   
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
        return i * (w / data.length) + (w / data.length - barPadding) / 2;
   })
   .attr("y", function(d) {
        return h - (d * 4) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "14px")
   .attr("fill", "white");
   
   //add a value label to the right of each bar*/
   
  
    }
 