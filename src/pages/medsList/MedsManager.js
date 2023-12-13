import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MedsList from "./MedsList";
import addMeds from "../../assets/images/pill-multiple_on.png";
import medsSearch from "../../assets/images/search4.png";

import "./medsList.css";

function MedsManager() {
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState("");
	const [activeSearchQuery, setActiveSearchQuery] = useState("");
	const [lastSearchTerm, setLastSearchTerm] = useState("");
	const handleAddMed = () => {
		navigate("/add-med");
	};
	const performSearch = () => {
		setActiveSearchQuery(searchInput);
		setLastSearchTerm(searchInput);
		setSearchInput(""); // Clear the input after search
	};

	const clearFilter = () => {
		setActiveSearchQuery("");
		setLastSearchTerm("");
	};
	const handleEditMed = (medId) => {
		navigate(`/edit-med/${medId}`);
	};

	const handleSearchChange = (e) => {
		setSearchInput(e.target.value);
	};

	return (
		<div>
			<div className="menuContainer">
				<div onClick={handleAddMed} style={{ cursor: "pointer" }}>
					<img src={addMeds} className="addMeds" alt="Add medicaiton" /> Add New
					Med(s)
				</div>
				<div>
					<input
						type="text"
						placeholder="Search"
						value={searchInput}
						onChange={handleSearchChange}
					/>
					<img
						src={medsSearch}
						className="medsSearch"
						alt="Search"
						onClick={performSearch}
					/>
				</div>
			</div>
			{lastSearchTerm && (
				<div className="search-results-container">
					<span>Searching for: {lastSearchTerm}</span>
					<button onClick={clearFilter}>Clear Filter</button>
				</div>
			)}
			<MedsList onEditMed={handleEditMed} searchQuery={activeSearchQuery} />
		</div>
	);
}

export default MedsManager;
