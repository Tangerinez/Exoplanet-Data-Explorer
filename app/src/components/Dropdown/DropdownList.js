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
          {this.props.xAxis
            ? categories.map((item, i) => (
                <input
                  className="input-category"
                  type="text"
                  value={item}
                  key={i}
                  onClick={this.props.handleCategoryX}
                  readOnly
                />
              ))
            : categories.map((item, i) => (
                <input
                  className="input-category"
                  type="text"
                  value={item}
                  key={i}
                  onClick={this.props.handleCategoryY}
                  readOnly
                />
              ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownList;
