import React from "react";
import DropdownList from "../Dropdown/DropdownList";
import "./Axis.css";

class Axis extends React.Component {
  state = {
    category: this.props.startingCategory
  };

  handleCategory = event => {
    this.setState({ category: event.target.value });
  };

  render() {
    console.log(this.state.category);
    return (
      <div
        className="axis-wrap"
        style={{ borderLeft: `${this.props.leftBorderStyle}` }}
      >
        <div className="title">{this.props.title}</div>
        <DropdownList
          startingCategory={this.state.category}
          handleCategory={this.handleCategory}
        />
      </div>
    );
  }
}

export default Axis;
