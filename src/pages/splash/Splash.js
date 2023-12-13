import React from "react";
import "./Splash.css";
import logo from "../../assets/images/logoB.png";
import loading from "../../assets/images/loading5.gif";
const SplashScreen = () => {
	return (
		<div className="splash-screen">
			<div className="splash-content">
				<img src={logo} alt="App Logo" className="splash-logo" />
				<div className="loading-indicator">
					<img
						src={loading}
						alt="Loading page"
						style={{ marginTop: 50, width: 120 }}
					/>
				</div>
			</div>
		</div>
	);
};

export default SplashScreen;
