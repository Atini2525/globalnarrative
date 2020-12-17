/*const width = window.innerWidth * 0.7,
  height = window.innerHeight * 10,
  margin1 = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 3;*/
  svgWidht = window.innerWidth * .60,
  svgHeight = window.innerHeight * 1,
   margin = {top: svgHeight/20, bottom: 50, left: 80, right: 80},
   radius = 3,
   default_selection = "Select a Country";

  svgWidht
  svgHeight
/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg4;
let xScale4;
let yScale4;
let yAxis4;
/* 
this extrapolated function allows us to replace the "G" with "B" min the case of billions.
we cannot do this in the .tickFormat() because we need to pass a function as an argument, 
and replace needs to act on the text (result of the function). 
*/
const formatBillions = (num) => d3.format(".2s")(num).replace(/G/, 'B')

/**
 * APPLICATION STATE
 * */
let state3 = {
  data3: [],
  selectedCountry3: null,
};

/**
 * LOAD DATA
 * */
/*d3.csv("happinessandfertility.csv", f => ({
  year1: +f.year1,
  country1: f.country1,
  estimate_Happiness1: +f.estimate_Happiness1,
  EstimateFertility1:+f.EstimateFertility1,
})).then(raw_data3 => {
  console.log("raw_data", raw_data3);
  state3.data3 = raw_data3;
  init3();
});*/
/*d3.csv("happinessandfertility.csv").then(raw_data3=> {
  data = raw_data3;
console.log(data);
console.log(data.happinessScore);
data2 = data.map(function (d) {
 console.log(state.datahappy);
 return happinessScore=+d.happinessScore;
});
init3();
});*/
/**
 * INITIALIZING FUNCTION
 * this will be run *one time* when the data finishes loading in
 * */
d3.csv("happinessandfertility1.csv").then(raw_data3=> {
  state3.data3 = raw_data3;
console.log(state3.data3);
//console.log(data.happinessScore);
/*data2 = data.map(function (d) {
 console.log(state.datahappy);
 return happinessScore=+d.happinessScore;
});*/
init3();
});
function init3() {
 
  

  // SCALES
  xScale4 = d3
    .scaleTime()
    .domain(d3.extent(state3.data3, d => d.year1))
     //.domain([2, d3.max(state.data, d => d.year)])
     //.range([ 0,600]);
    .range([margin.left, svgWidht - margin.right]);

  yScale4 = d3
    .scaleLinear()
  //  .domain([0, d3.max(state.data, d => d.estimate_Happiness)])
     .domain([0, 8])
     // .range([svgHeight,0]);
    //.range([ 550,0]);
   // .range([svgHeight , 0]);

    .range([svgHeight - margin.bottom, margin.top]);


  // AXES
  const xAxis4 = d3.axisBottom(xScale4);
  yAxis4 = d3.axisLeft(yScale4).tickFormat(formatBillions);

  // UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown").on("change", function() {
    console.log("new selected entity is", this.value);
    // `this` === the selectElement
     this.value// holds the dropdown value a user just selected
    state3.selectedCountry3 = this.value;
    draw3(); // re-draw the graph based on this new selection
  });

  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")
    .data([
      ...Array.from(new Set(state3.data3.map(d => d.country1))),
      default_selection,
    ])
    .enter().append('option')
  //  .join("option")
    .attr("value", d => d)
    .text(d => d);

  // this ensures that the selected value is the same as what we have in state when we initialize the options
  selectElement.property("value", default_selection);

  // create an svg element in our main `d3-container` element
  svg4 = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", svgWidht)
    .attr("height", svgHeight);
    //legend
    //legend 
svg4.append("circle").attr("cx",1000).attr("cy",80).attr("r", 6).style("fill", "yellow")
svg4.append("circle").attr("cx",1000).attr("cy",110).attr("r", 6).style("fill", "green")
svg4.append("text").attr("x", 1010).attr("y", 80).text("Happiness Rate").style("font-size", "15px").attr("alignment-baseline","middle")
svg4.append("text").attr("x", 1010).attr("y", 110).text("fertility Rate").style("font-size", "15px").attr("alignment-baseline","middle")

  // add the xAxis
  svg4
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${svgHeight - margin.bottom})`)
    .call(xAxis4)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Year");

  // add the yAxis
  svg4
    .append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis4)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%")
    .attr("dx", "-3em")
    .attr("writing-mode", "vertical-rl")
    .text("Fertility and Happiness Rate");

  draw3(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw3() {
  // filter the data for the selectedParty
  let filteredData1 = [];
  if (state3.selectedCountry3 !== null) {
    filteredData1 = state3.data3.filter(d => d.country1 === state3.selectedCountry3);
  }

  // update the scale domain (now that our data has changed)
 // yScale.domain([0, d3.max(filteredData, d => d.estimate_Happiness)]);

  // re-draw our yAxix since our yScale is updated with the new data
 /* d3.select("g.y-axis")
    .transition()
    .duration(1000)
    .call(yAxis.scale(yScale)); // this updates the yAxis' scale to be our newly updated one*/

  // we define our line function generator telling it how to access the x,y values for each point
  //const lineFunc = d3
  //  .line()
  //  .x(d => xScale(d.year))
  // .y(d => yScale(d.fertility_rate));
  
 /* const lineFunc = d3
  .line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.estimate_Happiness))*/
 // .curve(d3.curveMonotoneX)
 //  const curve = d3.curveLinear
 
 var lineFunc = d3.line()
    .x(function(d) { return xScale4(d.year1); })
    .y(function(d) { return yScale4(d.estimate_Happiness1); });
    // define second line 
 var lineFunc1 = d3.line()
    .x(function(d) { return xScale4(d.year1); })
    .y(function(d) { return yScale4(d.EstimateFertility1); });

    var div3 = d3.select("body").append("div")
    .attr("class", "tooltip3")
    .style("opacity", 0);
 var div4 = d3.select("body").append("div")
    .attr("class", "tooltip4")
    .style("opacity", 0);
  const dot3 = svg4
    .selectAll(".dot3")
    .data(filteredData1, d => d.year1) // use `d.year` as the `key` to match between HTML and data elements
    .join(
     //.enter()
      enter =>
        // enter selections -- all data elements that don't have a `.dot` element attached to them yet
        enter
          .append("circle")
          .attr("fill", "yellow")// the line 
          .attr("class", "dot3") // Note: this is important so we can identify it in future updates
          .attr("r", 3)
          .attr("cy", svgHeight - margin.bottom) // initial value - to be transitioned
          .attr("cx", d => xScale4(d.year1))
         .on("mouseover", function(d) {
            div3.transition()
              .duration(200)
              .style("opacity", .9);
            div3.html( "<br/>" + d.estimate_Happiness1)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
            })
          .on("mouseout", function(f) {
            div3.transition()
              .duration(500)
              .style("opacity", 0);
            }),
      update => update,
      exit =>
        exit.call(exit =>
          // exit selections -- all the `.dot` element that no longer match to HTML elements
          exit
            .transition()
            .delay(d => d.year1)
            .duration(500)
            .attr("cy", svgHeight - margin.bottom)
            .remove()
        )
    )
    
   // path
    // the '.join()' function leaves us with the 'Enter' + 'Update' selections together.
    // Now we just need move them to the right place
    .call(
      selection =>
        selection
          .transition() // initialize transition
          .duration(1000) // duration 1000ms / 1s
          .attr("cy", d => yScale4(d.estimate_Happiness1)) // started from the bottom, now we're here
    );
    const dot4 = svg4
    .selectAll(".dot4")
    .data(filteredData1, d => d.year1) // use `d.year` as the `key` to match between HTML and data elements
   // .enter()
   .join(
      enter1 =>
        // enter selections -- all data elements that don't have a `.dot` element attached to them yet
        enter1
          .append("circle")
          .attr("fill", "green")// the line 
          .attr("class", "dot4") // Note: this is important so we can identify it in future updates
          .attr("r", 3)
         // .attr("cy", height - margin.bottom) // initial value - to be transitioned
          .attr("cx", d => xScale4(d.year1))
         .on("mouseover", function(d) {
            div4.transition()
              .duration(200)
              .style("opacity", .9);
            div4.html('year is ' +d.year1   +'  value is '+ + d.EstimateFertility1)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
            })
          .on("mouseout", function(d) {
            div4.transition()
              .duration(500)
              .style("opacity", 0);
            }),
         
      update1 => update1,
      exit1 =>
        exit1.call(exit1 =>
          // exit selections -- all the `.dot` element that no longer match to HTML elements
          exit1
            .transition()
            .delay(d => d.year1)
            .duration(500)
            .attr("cy", svgHeight - margin.bottom)
            .remove()
        )
   )
   // path
    // the '.join()' function leaves us with the 'Enter' + 'Update' selections together.
    // Now we just need move them to the right place
    .call(
      selection1 =>
        selection1
          .transition() // initialize transition
          .duration(1000) // duration 1000ms / 1s
          .attr("cy", d => yScale4(d.EstimateFertility1)) // started from the bottom, now we're here);
          );
        const line = svg4
          .selectAll("path.line")
          .data([filteredData1])
          .join(
           // .enter()
            enter =>
              enter
                .append("path")
                .attr("class", "line")
                .attr("stroke", "yellow")
                .attr("fill","none"),
                //.attr("opacity", 0)
                //.attr(0, "opacity"), // start them off as opacity 0 and fade them in
            update => update, // pass through the update selection
            exit => exit.remove(),
            )
          .call(selection =>
            selection
              .transition() // sets the transition on the 'Enter' + 'Update' selections together.
              .duration(1000)
              .attr("opacity", 1)
              .attr("d", d => lineFunc(d))
          );
          const line1 = svg4
          .selectAll("path.line1")
          .data([filteredData1])
          .join(
           // .enter()
            enter1 =>
              enter1
                .append("path")
                .attr("class", "line1")
                .attr("stroke", "green")
                .attr("fill","none")
             .attr("opacity", 0)
               .attr(0, "opacity"),
              // .attr(0, "opacity"), // start them off as opacity 0 and fade them in
            update1 => update1, // pass through the update selection
            exit1 => exit1.remove(),
            )
          .call(selection =>
            selection
              .transition() // sets the transition on the 'Enter' + 'Update' selections together.
              .duration(1000)
              .attr("opacity", 1)
              .attr("d", d => lineFunc1(d))
          );
         
}