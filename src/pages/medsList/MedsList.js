import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	fetchFromIndexedDB,
	deleteRecordFromIndexedDB,
} from "../../components/database/indexedDBUtils";
import Modal from "react-modal";

import "./medsList.css";

import trashCan from "../../assets/images/delete-forever-outline_on.png";
import editMed from "../../assets/images/edit3.png";
import logo from "../../assets/images/logoB.png";

function MedsList(props) {
	const [meds, setMeds] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedMedId, setSelectedMedId] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const medsData = await fetchFromIndexedDB("HealthDatabase", "Meds");
				setMeds(medsData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const customModalStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			width: "350px",
			height: "375px",
		},
	};

	const openModal = (medId) => {
		setSelectedMedId(medId);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};
	const confirmDelete = async () => {
		try {
			await deleteRecordFromIndexedDB("HealthDatabase", "Meds", selectedMedId);
			const updatedMeds = meds.filter((med) => med.medID !== selectedMedId);
			setMeds(updatedMeds);
		} catch (error) {
			console.error("Error deleting medication:", error);
		}
		closeModal();
	};

	if (meds.length === 0) {
		return <div style={{ margin: "15px" }}>No records found</div>;
	}

	return (
		<div style={{ margin: "15px" }}>
			{meds.map((item) => (
				<div className="medItem" key={item.medID}>
					{" "}
					<div className="row">
						<div>
							<strong>Name:</strong> {item.medName}
						</div>
						<div>
							<strong>Start Date:</strong> {item.startDate}
						</div>
						<div>
							<strong>End Date:</strong> {item.endDate}
						</div>
					</div>
					<div className="row">
						<div>
							<strong>Dosage:</strong> {item.dosage}
						</div>
						<div>
							<strong>Frequency:</strong> {item.frequency}
						</div>
					</div>
					<div className="row">
						<div>
							<strong>Instructions:</strong> {item.instructions}
						</div>
					</div>
					<div className="row">
						<div>
							<strong>Reactions:</strong> {item.reactions}
						</div>
						<div>
							<strong>Notes:</strong> {item.notes}
						</div>
					</div>
					<div className="row">
						<div>
							<strong>Groups/Tracks:</strong> {item.groupTracks}
						</div>
					</div>
					<div className="medActions">
						<div
							onClick={() => props.onEditMed(item.medID)}
							className="actionLink"
						>
							<img src={editMed} className="actionIcon" alt="Edit" />
							<span>Edit</span>
						</div>
						<div onClick={() => openModal(item.medID)} className="actionLink">
							<img src={trashCan} className="actionIcon" alt="Delete" />
							<span>Delete</span>
						</div>
					</div>
				</div>
			))}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customModalStyles}
			>
				<div className="modal-content">
					<img src={logo} alt="trackRX Logo" className="modal-image" />
					<h2>Confirm Delete</h2>
					<p>Are you sure you want to delete this medication?</p>
					<div className="modal-buttons">
						<button onClick={confirmDelete}>Yes, Delete it</button>
						<button onClick={closeModal}>Cancel</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default MedsList;
