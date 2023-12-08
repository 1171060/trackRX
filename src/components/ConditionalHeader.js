import React from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/header/header";

function ConditionalHeader() {
  const location = useLocation();

  // Check if the current route is not the home page
  if (location.pathname !== "/home") {
    return <Header />;
  }

  return null;
}
export default ConditionalHeader;
