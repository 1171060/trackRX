import React from "react";
import "./navBar.css";
const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/meds">Medications</a>
        </li>
        <li>
          <a href="/groups">Grouping</a>
        </li>
        <li>
          <a href="/notifications">Notifications</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
