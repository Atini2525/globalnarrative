// If you look closely, you can also see that the values associated with these properties are all strings. This is probably not what you want in the case of numbers. When loading CSVs and other flat files, you have to do the type conversion.

  // We will see more of this in other tasks, but a simple way to do this is to use the + operator (unary plus). forEach can be used to iterate over the data array.
   // with json no need to put + for numeric , no need conversion 
//   import d3 from 'd3';




  
 /*width = window.innerWidth * 0.6,
height = window.innerHeight * 0.5,
margin = { top: 20, bottom: 50, left: 40, right: 30 };*/
width = 700,
height = window.innerHeight * 0.6,
margin = { top: 20, bottom: 50, left: 5, right: 5 };
var color = d3.scaleOrdinal(d3.schemeCategory10);
var colorScale7 = d3.scaleLinear()
//.domain([1, 10, 20])
//.range(['#d73027', '#fee08b', '#1a9850'])
.range(['#fee08b', '#1a9850', '#d73027'])

//.range(["yellow", "red"])
.interpolate(d3.interpolateHcl); 



    let svg7;
    var name7=[];
    var data7=[];
//     
var   Ladder_score7=[];
var countryById7 = d3.map();
 // inisiate the object state 
        let state7 = {
            datageojson: null,
            datahappy7: null,
            datageometrie: null,
            hover: { // hover is an object and it has two properties latitude and 
              latitude1: null,
              longitude1: null,
            },
          };   
          
       
        //read in topojson
        /*d3.queue()
        .defer(d3.json,"usState.json")
        .await(ready)*/
Promise.all([
           d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"),d3.csv("happinessbycountry1.csv"), // pull a new file in promises 
       ]).then( ([datageojson,datahappy7])=>{ // it returns an object 
       
         var countries = topojson.feature(datageojson,datageojson.objects.countries).features;
         //neighbors = topojson.neighbors(datageojson.objects.countries.geometries);
         state7.datageojson = countries;
            state7.datahappy7= datahappy7;
console.log(state7.datahappy7);
          //  colorScale.domain(d3.extent(state.datahappy.Ladder_score, function(d) {return d.state.datahappy.Ladder_score;}));
          data7 = state7.datahappy7.map(function (e) {
           console.log(state7.datahappy7);
           return Ladder_score7=+e.Ladder_score7;
         });
        
            init7();
        });

        function init7() {
         
          console.log(data7);
         // colorScale.domain(d3.extent(data2, function(d) {return d.data2;}));
          colorScale7.domain([d3.min(data7), d3.max(data7)]); // color scale since my data is an array and not an object, I used Min and max

         var zoom7 = d3.zoom(); // for the zoom 
         svg7=d3.select("#map")
         .append("svg")
         .attr("height",height  )
         .attr("width",width)
         .call(d3.zoom().on('zoom',()=>{
          console.log('zoom');
          svg7.attr("transform", d3.event.transform) // zoom transform 
         }))
          .append("g")
      
      
       ///      svg.call(tip);       
const projection7 = d3.geoMercator();
var path7=d3.geoPath()
.projection(projection7)

/*state.datageojson.foreach( d=>{
  Object.assign
});
*/
       //create the element 
        svg7.selectAll(".state")
           .data(state7.datageojson)
           .enter().append("path")
           .attr("class","state")
          .attr("d",path7)
          .attr("country", d=> d.properties.name)
        //  .attr("id", d=> d.id);
        svg7.call(tip7);
         svg7.selectAll('path')
      // .on("mouseover", handleMouseover1) ;  
    //  svg.selectAll('path')
      .on("mouseover", tip7.show) // for the tooltip
      .attr('fill', function(d,i) {  // color of the map depending of the size
       //console.log(d.Ladder_score);
       return getColor(d);
   })		
   .append("title");
      
          /*.on("mouseover", function(d, i) {
           tip.show(d);
           //reporter1(d) ;               
                           });*/

             function reporter1(x) { // my first try of tooltip 
                    console.log(x)
         state7.datahappy7.forEach(function(d, i) {
           state7.datageojson.forEach(function(e, j) {

           d3.selectAll("#report1").text(function() {

          if (d.id === e.id) {
       console.log(d.id)
       console.log(e.id)
        e.name = d.name
        e.Ladder_score7=d.Ladder_score7
          }
          return [x.name,x.Ladder_score7];

         })
         })
       })
     }
     function getColor(d) {
       
       state7.datahappy7.forEach(function(f, i) {
         state7.datageojson.forEach(function(e, j) {

        if (f.id === e.id) {
    // console.log(f.id)
    // console.log(e.id)
      e.name = f.name
      e.Ladder_score7=f.Ladder_score7  
        } 
       })
     })
     return colorScale7(d.Ladder_score7);
   
   }

   var linear7 = colorScale7;
   svg7.append("g")
   .attr("class", "legendLinear")
  // .attr("transform","translate(-150,100)");
  .attr("transform","translate(1000,100)");
   var legendLinear7 = d3.legendColor()
   .shapeWidth(30)
   .orient('horizontal')
   .scale(linear7);
 
 svg7.select(".legendLinear")
   .call(legendLinear7);
  
  
   }



          var tip7 = d3.tip()  // tooltip 
          .attr('class', 'd3-tip')
          .offset([-5, 0])
          .html(function(d) {
           state7.datahappy7.forEach(function(f, i) { // I found only this solution to match json and csv
             state7.datageojson.forEach(function(e, j) { // it tooks me around 3 days to figure out it 
                                                       // but I am sure there is a better solution 
            if (f.id === e.id) {                      // I did not know how to declare this function and use it repeatdely
       //  console.log(f.id)
         console.log(e.id)
          e.name = f.name
          e.Ladder_score7=f.Ladder_score7  
            }
           })
         })
         return d.name + ": " + d.Ladder_score7; // data return 
          });

          