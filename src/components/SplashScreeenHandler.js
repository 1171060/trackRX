import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Splash from "../pages/splash/Splash";

const SplashScreenHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return <Splash />;
};

export default SplashScreenHandler;
