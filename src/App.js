import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing components
import SplashScreenHandler from "./components/SplashScreenHandler";
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

// Importing forms
import MedForm from "./js/medForm";
import GroupTrackForm from "./js/GroupTrackForm";
import MedList from "./js/MedList";
import MedsManager from "./pages/medsList/MedsManager";
// Importing CSS
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
            <Route path="/home" element={<Home />} />
            <Route path="/meds" element={<MedsList />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-med" element={<MedForm />} />
            <Route path="/add-group" element={<GroupTrackForm />} />
            <Route path="/med-list" element={<MedList />} />
            <Route path="/important" element={<ImportantUsage />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/data-privacy" element={<DataPrivacy />} />
            <Route path="/meds" element={<MedsManager />} />
          </Routes>
        </div>
        <FooterNav />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
