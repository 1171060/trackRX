import React from "react";
import "./disclaimers.css";

function importantUsage() {
  return (
    <div className="disclaimerContainer">
      <p>
        <h1>Important Usage Disclaimer</h1>
      </p>
      <p>
        trackRX is a tool designed to assist you in managing your prescription
        medications. While we strive to provide a helpful and functional
        application, it is important to understand that trackRX is not a
        substitute for professional medical advice, diagnosis, or treatment.
      </p>
      <p>
        <h2>Consult Healthcare Professionals</h2>
      </p>
      <p>
        Always consult with your physician, pharmacist, or other qualified
        health providers regarding your medication and health-related questions.
        Do not use this app to make medical decisions without first consulting
        these professionals. Your health is too important to leave solely in the
        hands of any application.
      </p>
      <p>
        <h2>Not for Medical Advice or Dosage Information</h2>
      </p>
      <p>
        Our app is intended to help you track and organize your medications but
        is not designed to provide medical advice or specific dosage
        instructions. The accuracy and applicability of any information
        pertaining to your health condition should always be confirmed with a
        healthcare provider.
      </p>
      <p>
        <h2>Your Responsibility</h2>
      </p>
      <p>
        Your use of trackRX is at your own discretion and risk. You are
        responsible for making sure the information in the app is accurate and
        up-to-date. Remember, managing your health should be a collaborative and
        informed process involving you and your healthcare providers.
      </p>
    </div>
  );
}

export default importantUsage;
