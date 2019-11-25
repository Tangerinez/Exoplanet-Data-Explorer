import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navBar-wrap">
      <div className="navBar-container">
        <div>Exoplanet Data Explorer</div>
        <img src="./Earth.png" className="earth" alt="earth"></img>
      </div>
    </div>
  );
}

export default Navbar;
