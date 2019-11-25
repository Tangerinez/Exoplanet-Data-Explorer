import React from "react";
import Axis from "../Axis/Axis";
import "./AxisContainer.css";

class AxisContainer extends React.Component {
  state = {
    leftBorderStyle: 0
  };

  componentDidMount() {
    window.addEventListener("resize", this.leftBorderUpdate);
  }

  leftBorderUpdate = () => {
    if (window.innerWidth >= 768) {
      // Add border at 768px between x and y histogram
      this.setState({
        leftBorderStyle: "3px solid black"
      });
    } else {
      this.setState({ leftBorderStyle: 0 });
    }
  };

  render() {
    return (
      <div className="axis-container">
        <Axis
          title="X-Axis"
          startingCategory={this.props.categoryX}
          handleCategoryX={this.props.handleCategoryX}
          handleCategoryY={this.props.handleCategoryY}
          xAxis={true}
          xAxisData={this.props.xAxisData}
          yAxisData={this.props.yAxisData}
        />
        <Axis
          title="Y-Axis"
          startingCategory={this.props.categoryY}
          leftBorderStyle={this.state.leftBorderStyle}
          isDesktop={this.state.isDesktop}
          handleCategoryX={this.props.handleCategoryX}
          handleCategoryY={this.props.handleCategoryY}
          xAxis={false}
          xAxisData={this.props.xAxisData}
          yAxisData={this.props.yAxisData}
        />
      </div>
    );
  }
}

export default AxisContainer;
