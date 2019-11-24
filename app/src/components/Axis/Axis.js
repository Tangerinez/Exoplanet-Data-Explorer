import React from "react";
import DropdownList from "../Dropdown/DropdownList";
import Histogram from "../Histogram/Histogram";
import "./Axis.css";

class Axis extends React.Component {
  render() {
    return (
      <div
        className="axis-wrap"
        style={{ borderLeft: `${this.props.leftBorderStyle}` }}
      >
        <div className="title">{this.props.title}</div>
        <DropdownList
          startingCategory={this.props.startingCategory}
          handleCategoryX={this.props.handleCategoryX}
          handleCategoryY={this.props.handleCategoryY}
          xAxis={this.props.xAxis}
        />
        <Histogram />
      </div>
    );
  }
}

export default Axis;
