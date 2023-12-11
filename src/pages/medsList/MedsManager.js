import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MedsList from "./MedsList";
import MedForm from "../../js/medForm";
import addMeds from "../../assets/images/pill-multiple_on.png";
import medsSearch from "../../assets/images/search4.png";
import { getRecordById } from "../../components/database/indexedDBUtils";

function MedsManager() {
	const navigate = useNavigate();

	const handleAddMed = () => {
		navigate("/add-med");
	};

	const handleEditMed = (medId) => {
		console.log("Navigating to edit-med with ID:", medId); // Debugging line
		navigate(`/edit-med/${medId}`);
	};

	return (
		<div>
			<div className="menuContainer">
				<div onClick={handleAddMed}>
					<img src={addMeds} className="addMeds" /> Add New Med(s)
				</div>
				<div>
					<input type="text" placeholder="Search " />{" "}
					<img src={medsSearch} className="medsSearch" />
				</div>
				{/* <button onClick={handleAddMed}>Add New Meds</button> */}
			</div>

			<MedsList onEditMed={handleEditMed} />
		</div>
	);
}

export default MedsManager;
