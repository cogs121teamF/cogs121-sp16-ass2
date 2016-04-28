(function($) {
  "use strict";

  // function doYelpCall(result) {

  // }

  d3.json("/delphidata", function(err, data) {
        if (err) {
            console.log("index error: " + err);
            return;
        }

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // setup x
  var xValue = function(d) { return d.lon;}, // data -> value
      xScale = d3.scale.linear().range([0, width]), // value -> display
      xMap = function(d) { return xScale(xValue(d));}, // data -> display
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");

  // setup y
  var yValue = function(d) { return d.lat;}, // data -> value
      yScale = d3.scale.linear().range([height, 0]), // value -> display
      yMap = function(d) { return yScale(yValue(d));}, // data -> display
      yAxis = d3.svg.axis().scale(yScale).orient("left");

  // add the graph canvas to the body of the webpage
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  // var link = d3.select("body").append("div")
  //     .attr("class", "link")
  //     .style("opacity", 0);

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
  yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);

  // x-axis LONGITUDE
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Longitude");

  // y-axis LATITUDE
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Latitude");

  var url = "";
  var ajaxSucceeded = false;
  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .on("mouseover", function(d) {
          d3.select(this)
            .style("r", 7)
            .style("stroke", "green")
            .style("stroke-width", "3")
      })
      .on("click", function(d) {
          var taqueriaName = d.Permit_Nam.toLowerCase();
          taqueriaName = taqueriaName.replace(/[^a-zA-Z-]/g, '');
          console.log(taqueriaName);
          tooltip.transition()
              .duration(500)
              .style("opacity", .9);
          tooltip.html('<div class="preloader-wrapper big active"> <div class="spinner-layer spinner-green-only"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> </div>')
              .style("float", "right")
              .style("top", 150 + "px")
              .style("font-size", 20 + "px");
          $.ajax({
            url: "/yelpcall",
            data: {
              name: taqueriaName,
              location: d.Address_co,
              lat: d.lat,
              lon: d.lon
            },
            success: function(result) {
                ajaxSucceeded = true;
                tooltip.html(
                  '<div class="card"> <div class="card-image"> <img src="' +result.image+'" height="250" width="250"> <span class="card-title">'+d.Permit_Nam+'</span> </div> <div class="card-content">'+ d.Business_A + "<br/>" + "Rating: " + result.rating + " " + "<img src='" + result.rating_image_url + "'>" + "<br/>" + "Number of Reviews: " + result.review_count + "<br/>" + 
                  '</div> </div>')
                    .style("float", "right")
                    .style("top", 100 + "px")
                    .style("font-size", 20 + "px");
                url = result.url;
            },
            error: function(xhr) {
              console.log(xhr);
            }
          });
          if (!ajaxSucceeded) {
              tooltip.html('<div class="preloader-wrapper big active"> <div class="spinner-layer spinner-green-only"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> </div>')
              .style("float", "right")
              .style("top", 100 + "px")
              .style("font-size", 20 + "px");
          }
      })
      .on("mouseout", function(d) {
          // tooltip.transition()
          //      //.duration(500)
          //      .style("opacity", 0);
          d3.select(this)
            .style("r", 3.5)
            .style("stroke", "black")
            .style("stroke-width", "0");
          ajaxSucceeded = false;
          url = "";
      })
    });      
})($);
