import React from "react";
import "./Scatterplot.css";
import * as d3 from "d3";

class Scatterplot extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.xAxisData === this.props.xAxisData &&
      nextProps.yAxisData === this.props.yAxisData
    ) {
      return false;
    } else {
      this.removeSVG();
      return true;
    }
  }

  componentDidUpdate() {
    this.drawScatterplot(this.props.xAxisData, this.props.yAxisData);
  }

  median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

  poolData = (x, y) => {
    // combine x and y data into array of arrays [[],[],[]]
    let pooledXYData = [];
    for (var i = 0; i < x.length; i++) {
      let pairArray = [];
      pairArray.push(x[i]);
      pairArray.push(y[i]);
      pooledXYData.push(pairArray);
    }
    return pooledXYData;
  };

  removeSVG = () => {
    // prevent duplicate svg elements
    d3.select(".svg-scatter-container").remove();
  };

  scaleDownData = data => {
    // scale down data dynamically based off of max
    let max = Math.max(...data);
    let scaledDownData = [];
    if (max >= 10000) {
      for (var i = 0; i < data.length; i++) {
        scaledDownData.push(data[i] / 100);
      }
    } else if (max >= 1000 && max < 10000) {
      for (var p = 0; p < data.length; p++) {
        scaledDownData.push(data[p]);
      }
    } else if (max >= 100 && max < 1000) {
      for (var f = 0; f < data.length; f++) {
        scaledDownData.push(data[f]);
      }
    } else {
      for (var b = 0; b < data.length; b++) {
        scaledDownData.push(data[b] * 10);
      }
    }
    return scaledDownData;
  };

  drawScatterplot = (xPropsData, yPropsData) => {
    // instantiates scatterplot
    const scaledXData = this.scaleDownData(this.props.xAxisData);
    const scaledYData = this.scaleDownData(this.props.yAxisData);
    const pooledXYData = this.poolData(scaledXData, scaledYData);

    const height = 650;
    const width = 650;

    let xMax;
    let decimalUnitX = "";
    let dividedUnitX = "";
    if (Math.max(...xPropsData) > 10000) {
      xMax = Math.max(...xPropsData) / 100;
      decimalUnitX += "0.01";
      dividedUnitX += "100";
    } else if (
      Math.max(...xPropsData) >= 1000 &&
      Math.max(...xPropsData) < 10000
    ) {
      xMax = Math.max(...xPropsData) / 10;
      decimalUnitX += "0.1";
      dividedUnitX += "10";
    } else if (
      Math.max(...xPropsData) >= 100 &&
      Math.max(...xPropsData) < 1000
    ) {
      xMax = Math.max(...xPropsData);
      decimalUnitX += "1";
      dividedUnitX += "1";
    } else {
      xMax = Math.max(...xPropsData) * 10;
      decimalUnitX += "10";
      dividedUnitX += "0.1";
    }

    let decimalUnitY = "";
    let dividedUnitY = "";
    if (Math.max(...yPropsData) > 10000) {
      decimalUnitY += "0.01";
      dividedUnitY += "100";
    } else if (
      Math.max(...yPropsData) >= 1000 &&
      Math.max(...yPropsData) < 10000
    ) {
      decimalUnitY += "0.1";
      dividedUnitY += "10";
    } else if (
      Math.max(...yPropsData) >= 100 &&
      Math.max(...yPropsData) < 1000
    ) {
      decimalUnitY += "1";
      dividedUnitY += "1";
    } else {
      decimalUnitY += "10";
      dividedUnitY += "*0.1";
    }

    var yMax = Math.max(...scaledYData);

    var svg = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("class", "svg-scatter-container")
      .attr("width", width)
      .attr("height", height);
    // Create scale
    var xscale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([0, width]);

    var yscale = d3
      .scaleLinear()
      .domain([-yMax, yMax])
      .range([height / 1.3, 0]);

    // Add scales to axis
    var x_axis = d3.axisBottom().scale(xscale);
    var y_axis = d3.axisLeft().scale(yscale);

    //Append group and insert axis
    var xAxisTranslate = height / 1.3 + 10;
    svg
      .append("g")
      .attr("transform", "translate(50, " + xAxisTranslate + ")")
      .call(x_axis);
    svg
      .append("g")
      .attr("transform", "translate(50, 10)")
      .call(y_axis);

    // text label for the x axis
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 1.65 + " ," + height / 1.15 + ")"
      )
      .style("text-anchor", "middle")
      .text(`${decimalUnitX} Units (Units/${dividedUnitX})`);

    // text label for the y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -6)
      .attr("x", 0 - height / 2.4)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(`${decimalUnitY} Units (Units/${dividedUnitY})`);

    svg
      .selectAll("circle")
      .data(pooledXYData)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("transform", "translate(52,12)")
      .attr("cx", function(datapoint) {
        // x-value
        return datapoint[0] * 2.45;
      })
      .attr("cy", function(datapoint) {
        // y-value
        return datapoint[1] * 1.15;
      })
      .attr("r", 3)
      .style("fill", "#000080");
  };

  render() {
    return (
      <div className="scatterplot-container">
        <div className="scatter-title">
          {this.props.categoryX} vs. {this.props.categoryY}
        </div>
        <div ref="canvas" className="scatterplot"></div>
      </div>
    );
  }
}

export default Scatterplot;
