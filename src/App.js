import * as React from "react";

import Button from "@mui/material/Button";

import logo from "./assets/images/logoB.png";
import "./index.css";
import "./pallette.css";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import JoinFullOutlinedIcon from "@mui/icons-material/JoinFullOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";

function App() {
  return (
    <div className="container">
      <header class="primaryColorBG">
        <div class="headerLeft">
          <div class="logo">
            <img src={logo} alt="trackRX Logo" />
          </div>
        </div>
        <div class="headerCenter">
          <div class="headLine highlightColor">trackRX</div>
        </div>
        <div class="headerRight">
          <div class="rightSideContent">
            {/* <span class="iconColorShadow">
              <LocalPharmacyOutlinedIcon />
              <DeleteForeverOutlinedIcon />
              <JoinFullOutlinedIcon />
              <MedicationOutlinedIcon />
            </span> */}
            <div class="textContainer">
              PLEASE READ THE DISCLAIMER NOTICE BELOW PRIOR TO STARTING
            </div>
          </div>
        </div>
      </header>

      <div class="copy">
        <p class="disclaimerHeadline">
          Disclaimer Notice for trackRX (Medication Tracking Application)
        </p>
        <p>
          trackRX ("the Application") is designed to assist users in tracking
          their medications and related health information. Please read the
          following disclaimer carefully before using the Application.
        </p>
        <p class="disclaimerHeadline">1. Not Medical Advice</p>
        <p>
          The information provided by the Application is for informational and
          educational purposes only and should not be considered medical advice.
          It is not a substitute for professional medical diagnosis, advice, or
          treatment. Always seek the advice of your physician or other qualified
          healthcare provider with any questions you may have regarding a
          medical condition.
        </p>
        <p class="disclaimerHeadline">2. User Responsibility</p>
        <p>
          You are responsible for your use of the Application, including the
          accuracy and completeness of the data you input. It is essential to
          double-check and verify the information provided by the Application
          with your healthcare provider.
        </p>
        <p class="disclaimerHeadline">3. No Endorsement</p>
        <p>
          The Application does not endorse or recommend any specific medication,
          treatment, healthcare provider, or healthcare service. Any
          recommendations or information provided are general in nature and may
          not be suitable for every individual.
        </p>
        <p class="disclaimerHeadline">4. Data Security</p>
        <p>
          We take data security seriously. However, no method of data
          transmission or storage is entirely secure, and we cannot guarantee
          the security of your information. You are responsible for maintaining
          the confidentiality and security of your login credentials.
        </p>
        <p class="disclaimerHeadline">5. Limitation of Liability</p>
        <p>
          The creators of the Application are not liable for any direct,
          indirect, incidental, consequential, or any other damages arising out
          of or in connection with the use of the Application. Your use of the
          Application is at your own risk.
        </p>
        <p class="disclaimerHeadline">6. Changes to Disclaimer</p>
        <p class="disclaimerHeadline">
          We reserve the right to modify or update this disclaimer at any time.
          Please review it periodically for any changes.
        </p>
        <p>
          By using the Application, you acknowledge that you have read,
          understood, and agreed to this disclaimer. If you do not agree with
          the terms and conditions outlined in this disclaimer, please do not
          use the Application.
        </p>
        <p class="disclaimerHeadline">
          This disclaimer is subject to change without notice.
        </p>
      </div>
      <div class="textContainer">
        <Button variant="contained">
          I have read and understood the disclaimer and want to begin using
          trackRX now.
        </Button>
        <br />
        &nbsp;
      </div>
    </div>
  );
}

export default App;
