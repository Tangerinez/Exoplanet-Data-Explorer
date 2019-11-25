import React from "react";
import DropdownList from "../Dropdown/DropdownList";
import Histogram from "../Histogram/Histogram";
import "./Axis.css";

function Axis(props) {
  return (
    <div
      className="axis-wrap"
      style={{ borderLeft: `${props.leftBorderStyle}` }}
    >
      <div className="title">{props.title}</div>
      <DropdownList
        startingCategory={props.startingCategory}
        handleCategoryX={props.handleCategoryX}
        handleCategoryY={props.handleCategoryY}
        xAxis={props.xAxis}
      />
      <Histogram
        xAxisData={props.xAxisData}
        yAxisData={props.yAxisData}
        xAxis={props.xAxis}
      />
    </div>
  );
}

export default Axis;
