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
        <Axis title="X-Axis" startingCategory="Action" />
        <Axis
          title="Y-Axis"
          startingCategory="Something Else"
          leftBorderStyle={this.state.leftBorderStyle}
          isDesktop={this.state.isDesktop}
        />
      </div>
    );
  }
}

export default AxisContainer;
