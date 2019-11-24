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
          xAxis={true}
        />
        <Axis
          title="Y-Axis"
          startingCategory={this.props.categoryY}
          leftBorderStyle={this.state.leftBorderStyle}
          isDesktop={this.state.isDesktop}
          handleCategoryY={this.props.handleCategoryY}
          xAxis={false}
        />
      </div>
    );
  }
}

export default AxisContainer;
