import React, { useState } from "react";
import MedsList from "./MedsList";
import MedForm from "../../js/medForm";

function MedsManager() {
  const [currentMed, setCurrentMed] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditMed = (medData) => {
    setCurrentMed(medData);
    setIsFormOpen(true);
  };

  const handleAddMed = () => {
    setCurrentMed(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <button onClick={handleAddMed}>Add New Meds</button>
      <MedsList onEditMed={handleEditMed} />
    </div>
  );
}

export default MedsManager;
