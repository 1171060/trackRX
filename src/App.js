import React from "react";

import SplashScreenHandler from "./components/SplashScreeenHandler";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import NavBar from "./components/NavBar/navBar";
import MedsList from "./pages/medsList/MedsList";
import Groups from "./pages/groups/groups";
import Profile from "./pages/profile/profile";

import ImportantUsage from "./components/disclaimers/importantUsage";
import Disclaimer from "./components/disclaimers/disclaimer";
import DataPrivacy from "./components/disclaimers/dataPrivacy";

import Footer from "./components/footer/footer";
import ConditionalHeader from "./components/ConditionalHeader";

import FooterNav from "./components/disclaimers/disclaimerNav";

import "./index.css";

function App() {
  return (
    <div className="site-container">
      <BrowserRouter>
        <NavBar />
        <ConditionalHeader />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<SplashScreenHandler />} />
            <Route path="home" element={<Home />} />
            <Route path="meds" element={<MedsList />} />
            <Route path="groups" element={<Groups />} />
            <Route path="profile" element={<Profile />} />
            <Route path="important" element={<ImportantUsage />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="data-privacy" element={<DataPrivacy />} />
          </Routes>
        </div>
        <FooterNav />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
