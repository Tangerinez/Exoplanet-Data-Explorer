import React from "react";
import "./Histogram.css";
import * as d3 from "d3";

class Histogram extends React.Component {
  componentDidMount() {
    this.drawBarChart();
  }

  drawBarChart = data => {
    const canvasHeight = 200;
    const canvasWidth = "100%";
    // const scale = 20;
    /*const svgCanvas = */ d3.select(this.refs.canvas) // svgCanvas is the black box the graph will be in
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid black");
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
