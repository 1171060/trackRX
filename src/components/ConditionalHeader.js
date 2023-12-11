import React from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/header/header";

function ConditionalHeader() {
  const location = useLocation();

  // Check if the current route is the home page
  if (location.pathname === "/home") {
    return null;
  }

  // Check if the current route is the "add-med" page
  if (location.pathname === "/add-med") {
    return <Header>Add Med Record</Header>;
  }

  // Check if the current route is the "edit-med" page
  if (location.pathname === "/edit-med") {
    return <Header>Update Med Record</Header>;
  }

  // For all other pages, display the header as is
  else {
    return <Header />;
  }
}

export default ConditionalHeader;
