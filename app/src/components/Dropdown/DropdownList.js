import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import categories from "../../categories";
import "./DropdownList.css";

class DropdownList extends React.Component {
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {this.props.startingCategory}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.props.xAxis // ternary to check if the dropdown is x-axis or y-axis
            ? categories.map((item, i) => (
                <input
                  className="input-category"
                  type="text"
                  value={item}
                  key={i}
                  onClick={this.props.handleCategoryX} // handler for x-axis dropdown
                  readOnly
                />
              ))
            : categories.map((item, i) => (
                <input
                  className="input-category"
                  type="text"
                  value={item}
                  key={i}
                  onClick={this.props.handleCategoryY} // handler for y-axis dropdown
                  readOnly
                />
              ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownList;
