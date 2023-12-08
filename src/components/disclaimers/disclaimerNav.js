import React from "react";

import "./disclaimers.css";

function disclaimerNav() {
  return (
    <div className="footerNav">
      <ul className="nav-links">
        <li>
          <a href="/important">IMPORTANT USAGE POLICY</a>
        </li>
        <li>
          <a href="/data-privacy">Data/Privacy Policy</a>
        </li>
        <li>
          <a href="/disclaimer">Usage Disclaimer</a>
        </li>
      </ul>
    </div>
  );
}

export default disclaimerNav;
