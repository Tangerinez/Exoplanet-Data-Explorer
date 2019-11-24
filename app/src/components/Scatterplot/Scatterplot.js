import React from "react";
import "./Scatterplot.css";
import * as d3 from "d3";
import data from "../../data/Exoplanet.csv";

class Scatterplot extends React.Component {
  state = {
    data: ""
  };
  componentDidMount() {
    d3.csv(data, function(data) {
      console.log(data);
    });
    this.drawAxis();
  }

  drawAxis = data => {
    const canvasHeight = 400;
    const canvasWidth = "100%";
    const scale = 20;
    const svgCanvas = d3 // svgCanvas is the black box the graph will be in
      .select(this.refs.canvas)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid black");
  };

  render() {
    console.log(data);
    return (
      <div className="scatterplot-container">
        {this.props.categoryX} vs. {this.props.categoryY}
        <div ref="canvas" className="scatterplot"></div>
      </div>
    );
  }
}

export default Scatterplot;
