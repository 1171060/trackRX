import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logoB.png";

function Header() {
  const location = useLocation();

  // Function to capitalize the first letter of each word
  const formatPageTitle = (path) => {
    return path
      .split("/")
      .filter((part) => part) // Removes any empty strings due to leading slashes
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" - ");
  };

  // Getting the formatted page title
  const pageTitle = formatPageTitle(location.pathname);

  return (
    <div style={{ textAlign: "center", fontSize: "18pt", width: "100%" }}>
      <img
        src={logo}
        alt="Logo"
        style={{ width: 100, margin: 10, justifySelf: "center" }}
      />
      &nbsp; trackRX {pageTitle && `- ${pageTitle}`}
    </div>
  );
}

export default Header;
