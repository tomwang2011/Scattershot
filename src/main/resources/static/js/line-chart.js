if(!$.scattershot)
	$.scattershot = {};


$.scattershot.lineChart = (function() {

	var getColorScheme = function(palette) {
		
		// constant
		var defaultPalette = ["steelblue", "darkred"];
			
		if(!palette || !Array.isArray(palette) || palette.length < 1)
			palette = defaultPalette;
			
		if(palette.length > 1)
			return {
				categories: palette.slice(0, palette.length - 1),
				highlight: palette[palette.length - 1]
			};
		else
			return {
				categories: palette,
				highlght: palette[0]
			};
	};

  var getScale = function(data, dataType, field) {

    var scale = null;
    var getValue = null;
    var domain = null;

    if(dataType.toLowerCase().indexOf("date") >= 0) {
      getValue = function(d) { new Date(d[field]); };
      scale = d3.time.scale();
    } else if(dataType.toLowerCase().indexOf("string") >= 0) {
      getValue = function(d) { return d[field]; };
      scale = d3.scale.ordinal();
    } else {
      getValue = function(d) { return d[field]; };
      scale = d3.scale.linear();
    }

    domain = [d3.min(data, getValue), d3.max(data, getValue)];
    scale.domain(domain);

    return scale;
  };
		
	var that = {

		// This code taken largely from the example at
		// http://bl.ocks.org/mbostock/1667367
		create: function(dataset, width, height, xType, yType, color) {

			debugger;
				
			var focusMarginRatio = {top: 0.01, right: 0.01, bottom: 0.2, left: 0.047};
			var contextMarginRatio = {top: 0.86, right: 0.01, bottom: 0.04, left: 0047};
				
			var focusMargin = {
				right: focusMarginRatio.right * width,
				left: focusMarginRatio.left * width,
				top: focusMarginRatio.top * height,
				bottom: focusMarginRatio.top * height
			};
			
			var contextMargin = {
				right: contextMarginRatio.right * width,
				left: contextMarginRatio.left * width,
				top: contextMarginRatio.top * height,
				bottom: contextMarginRatio.bottom * height
			};

			var plotWidth = width - focusMargin.right - focusMargin.left;
			var focusHeight = height - focusMargin.top - focusMargin.bottom;
			var contextHeight = height - contextMargin.top - contextMargin.bottom;
			
			var focusXScale = getScale(dataset, xType, "x").range([0, plotWidth]);
			var focusYScale = getScale(dataset, yType, "y").range([focusHeight, 0]);
			
			var contextXScale = getScale(dataset, xType, "x").range([0, plotWidth]);
			var contextYScale = getScale(dataset, yType, "y").range([contextHeight, 0]);
			
			var focusXAxis = d3.svg.axis()
	          .orient("bottom")
	          .scale(focusXScale);
	
			var focusYAxis = d3.svg.axis()
	          .orient("left")
	          .scale(focusYScale);
	
			var contextXAxis = d3.svg.axis()
	          .orient("bottom")
	          .scale(contextXScale);
	
			var focusLine = d3.svg.line()
	          .interpolate("linear")
	          .x(function(d) { return focusXScale(d.x); })
	          .y(function(d) { return focusXScale(d.y); });
	
			var contextLine = d3.svg.line()
	          .interpolate("linear")
	          .x(function(d) { return contextXScale(d.x); })
	          .y(function(d) { return contextYScale(d.y); });
	
	
			var svg = d3.select("body").append("svg")
	          .attr("width", width)
	          .attr("height", height);
	
			var brush = d3.svg.brush()
	          .x(contextXScale)
	          .on("brush", brushed);
	
			var focus = svg.append("g")
	          .attr("class", "focus")
	          .attr("transform", "translate(" + focusMargin.left + "," + focusMargin.top + ")");
	
			var context = svg.append("g")
	          .attr("class", "context")
	          .attr("transform", "translate(" + contextMargin.left + "," + focusMargin.top + ")");
			
			color = color || "steelblue";
	
			svg.append("defs").append("clipPath")
	          .attr("id", "clip")
	        .append("rect")
	          .attr("width", width)
	          .attr("height", height);	
	
			focus.append("path")
	          .datum(dataset)
	          .attr("class", "line")
	          .attr("d", focusLine)
	          .style("stroke", color);
	
			focus.append("g")
	          .attr("class", "x axis")
	          .attr("transform", "translate(0," + focusHeight + ")")
	          .call(focusXAxis);
	
			focus.append("g")
	          .attr("class", "y axis")
	          .call(focusYAxis);
	
			context.append("path")
	          .datum(dataset)
	          .attr("class", "line")
	          .attr("d", contextLine)
	          .style("stroke", color);
	
			context.append("g")
	          .attr("class", "x axis")
	          .attr("transform", "translate(0," + contextHeight + ")")
	          .call(contextXAxis);
	
			context.append("g")
	          .attr("class", "x brush")
	          .call(brush)
	        .selectAll("rect")
	          .attr("y", -6)
	          .attr("height", contextHeight + 7);
	
			function brushed() {
				focusXScale.domain(brush.empty() ? contextXScale.domain() : brush.extent());
				focus.select(".line").attr("d", focusLine);
				focus.select(".x.axis").call(focusXAxis);
			}
		}
	};

  return that;

})();