import React from "react";
import "./Histogram.css";
import * as d3 from "d3";

class Histogram extends React.Component {
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
    if (this.props.xAxis) {
      // check if histogram is x or y data
      this.drawBarChart(this.props.xAxisData);
    } else {
      this.drawBarChart(this.props.yAxisData);
    }
  }

  removeSVG = () => {
    // prevent duplicate svg elements
    d3.select(".svg-container").remove();
  };

  groupData = data => {
    // sorts original data into an array based off of ranges generated dynamically
    let max = Math.max(...data);
    let dataByInterval = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let scaledDownData = []; // scaled down data based on max
    let rangesArray = []; // interval ranges

    if (max >= 10000) {
      for (var i = 0; i < data.length; i++) {
        scaledDownData.push(data[i] / 100);
        for (var j = 0; j < 15; j++) {
          if (j === 0) {
            rangesArray.push(0);
          } else {
            rangesArray.push((max / 100 / 13) * j);
          }
        }
      }
    } else if (max >= 1000 && max < 10000) {
      for (var p = 0; p < data.length; p++) {
        scaledDownData.push(data[p] / 10);
        for (var n = 0; n < 15; n++) {
          if (n === 0) {
            rangesArray.push(0);
          } else {
            rangesArray.push((max / 10 / 13) * n);
          }
        }
      }
    } else if (max >= 100 && max < 1000) {
      for (var f = 0; f < data.length; f++) {
        scaledDownData.push(data[f]);
        for (var q = 0; q < 15; q++) {
          if (q === 0) {
            rangesArray.push(0);
          } else {
            rangesArray.push((max / 10 / 13) * q);
          }
        }
      }
    } else {
      for (var b = 0; b < data.length; b++) {
        scaledDownData.push(data[b] * 10);
        for (var h = 0; h < 15; h++) {
          if (h === 0) {
            rangesArray.push(0);
          } else {
            rangesArray.push((max / 10 / 13) * h);
          }
        }
      }
    }
    rangesArray.pop();

    for (var z = 0; z < 13; z++) {
      let count = 0;
      for (var k = 0; k < scaledDownData.length; k++) {
        if (z < 12) {
          if (
            scaledDownData[k] < rangesArray[z + 1] &&
            scaledDownData[k] >= rangesArray[z]
          ) {
            count++;
          }
        } else {
          if (scaledDownData[k] >= rangesArray[z]) {
            count++;
          }
        }
      }
      dataByInterval.splice(z, 1, count); // places the amount of data within that interval range into an array
    }
    return dataByInterval;
  };

  median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

  drawBarChart = data => {
    // instatiate histogram
    let scaledData;
    if (this.props.xAxis) {
      scaledData = this.groupData(this.props.xAxisData);
    } else {
      scaledData = this.groupData(this.props.yAxisData);
    }

    let width = 280;
    let height = 300;

    let xMax;
    let decimalUnit = "";
    let dividedUnit = "";

    if (Math.max(...data) > 10000) {
      xMax = Math.max(...data) / 100;
      decimalUnit += "0.01";
      dividedUnit += "100";
    } else if (Math.max(...data) >= 1000 && Math.max(...data) < 10000) {
      xMax = Math.max(...data) / 10;
      decimalUnit += "0.1";
      dividedUnit += "10";
    } else if (Math.max(...data) >= 100 && Math.max(...data) < 1000) {
      xMax = Math.max(...data);
      decimalUnit += "1";
      dividedUnit += "1";
    } else {
      xMax = Math.max(...data) * 10;
      decimalUnit += "10";
      dividedUnit += "0.1";
    }

    var yMax = this.median(scaledData);
    // Append SVG
    var svg = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("class", "svg-container")
      .attr("width", width)
      .attr("height", height);

    // Create scale
    var xscale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([0, width]);

    var yscale = d3
      .scaleLinear()
      .domain([0, yMax])
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
        "translate(" + width / 1.45 + " ," + height / 1.05 + ")"
      )
      .style("text-anchor", "middle")
      .text(`${decimalUnit} Units (Units/${dividedUnit})`);

    // text label for the y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -5)
      .attr("x", 0 - height / 2.4)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Frequency");

    svg
      .selectAll("rect")
      .data(scaledData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("transform", "translate(52)")
      .attr("width", 19.3)
      .attr("height", datapoint => datapoint * 10)
      .attr("fill", "teal")
      .attr("x", (datapoint, iteration) => iteration * 21.5) // x-axis position
      .attr("y", datapoint => height - datapoint * 10 - 59); // y-axis position
  };

  render() {
    return (
      <div className="histogram-container">
        <div ref="canvas" className="histogram"></div>
      </div>
    );
  }
}

export default Histogram;
