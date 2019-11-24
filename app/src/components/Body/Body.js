import React from "react";
import AxisContainer from "../AxisContainer/AxisContainer";
import Scatterplot from "../Scatterplot/Scatterplot";

class Body extends React.Component {
  state = {
    categoryX: "P. Min Mass (EU)",
    categoryY: "P. Mass (EU)"
  };

  handleCategoryX = event => {
    this.setState({
      categoryX: event.target.value
    });
  };

  handleCategoryY = event => {
    this.setState({
      categoryY: event.target.value
    });
  };

  render() {
    return (
      <div>
        <AxisContainer
          categoryX={this.state.categoryX}
          categoryY={this.state.categoryY}
          handleCategoryX={this.handleCategoryX}
          handleCategoryY={this.handleCategoryY}
        />
        <Scatterplot
          categoryX={this.state.categoryX}
          categoryY={this.state.categoryY}
        />
      </div>
    );
  }
}

export default Body;
