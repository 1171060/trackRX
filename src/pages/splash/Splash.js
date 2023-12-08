import React from "react";
import "./Splash.css";
import logo from "../../assets/images/logoB.png";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img src={logo} alt="App Logo" className="splash-logo" />
        <div className="loading-indicator">Loading...</div>
      </div>
    </div>
  );
};

export default SplashScreen;
