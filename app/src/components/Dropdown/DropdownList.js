import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./DropdownList.css";

class DropdownList extends React.Component {
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {this.props.startingCategory}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <input
            className="input-category"
            type="text"
            value="Action"
            onClick={this.props.handleCategory}
            readOnly
          />

          <input
            className="input-category"
            type="text"
            value="Another Action"
            onClick={this.props.handleCategory}
            readOnly
          />

          <input
            className="input-category"
            type="text"
            value="Something else"
            onClick={this.props.handleCategory}
            readOnly
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownList;
