import React from "react";
import "./Scatterplot.css";
import * as d3 from "d3";

class Scatterplot extends React.Component {
  componentDidMount() {
    this.drawAxis(this.props.xAxisData);
  }

  drawAxis = data => {
    const canvasHeight = 400;
    const canvasWidth = "100%";

    d3.select(this.refs.canvas)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid black");
  };

  render() {
    return (
      <div className="scatterplot-container">
        {this.props.categoryX} vs. {this.props.categoryY}
        <div ref="canvas" className="scatterplot"></div>
      </div>
    );
  }
}

export default Scatterplot;
