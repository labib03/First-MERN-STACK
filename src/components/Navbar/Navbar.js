import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h2>
            <span className="regular">Workout</span> Fitt
          </h2>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
