import React, { useState, useEffect } from "react";
import {
	addHealthProfessional,
	fetchHealthProfessionals,
	deleteHealthProfessional,
	updateHealthProfessional,
} from "../../indexedDB";
import Modal from "react-modal";
import "./care.css";
import logo from "../../assets/images/logoB.png";
const HealthcareProviderForm = () => {
	const [view, setView] = useState("list");
	const [formData, setFormData] = useState({
		name: "",
		type: "Physician",
		addressLine1: "",
		addressLine2: "",
		city: "",
		stateOrProvince: "",
		zipOrPostal: "",
		mainPhone: "",
		secondaryPhone: "",
	});
	const [providers, setProviders] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedProviderId, setSelectedProviderId] = useState(null);
	useEffect(() => {
		if (view === "list") {
			fetchProviders();
		}
	}, [view]);

	const fetchProviders = () => {
		fetchHealthProfessionals()
			.then((data) => setProviders(data))
			.catch((error) =>
				console.error("Error fetching health professionals:", error)
			);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		// Prepare the provider data for submission
		const providerData = {
			id: formData.id, // This will be undefined for new entries
			proName: formData.name,
			proType: formData.type,
			proAdd1: formData.addressLine1,
			proAdd2: formData.addressLine2,
			proCity: formData.city,
			proProv: formData.stateOrProvince,
			proZip: formData.zipOrPostal,
			proPhone1: formData.mainPhone,
			proPhone2: formData.secondaryPhone,
		};

		const handleResponse = () => {
			setView("list"); // Switch back to list view after saving
			fetchProviders(); // Refresh the list of providers
		};

		const handleError = (error) => {
			console.error("Error saving provider:", error);
		};

		// Check if we're adding a new provider or updating an existing one
		if (providerData.id) {
			// Update existing provider
			updateHealthProfessional(providerData)
				.then(handleResponse)
				.catch(handleError);
		} else {
			// Add new provider
			addHealthProfessional(providerData)
				.then(handleResponse)
				.catch(handleError);
		}
	};

	const openModal = (providerId) => {
		setSelectedProviderId(providerId);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const confirmDelete = async () => {
		try {
			await deleteHealthProfessional(
				"HealthDatabase",
				"HealthProfessionals",
				selectedProviderId
			);
			const updatedProviders = providers.filter(
				(provider) => provider.id !== selectedProviderId
			);
			setProviders(updatedProviders);
			closeModal();
		} catch (error) {
			console.error("Error deleting provider:", error);
		}
	};
	const toggleView = () => {
		setView(view === "list" ? "form" : "list");
	};

	const handleCancel = () => {
		setView("list");
	};
	// const handleDelete = (id) => {
	//   deleteHealthProfessional("HealthDatabase", "HealthProfessionals", id)
	//     .then(() => {
	//       // Remove the deleted item from the state
	//       const updatedProviders = providers.filter(
	//         (provider) => provider.id !== id
	//       );
	//       setProviders(updatedProviders);
	//     })
	//     .catch((error) => console.error("Error deleting provider:", error));
	// };

	const handleEdit = (provider) => {
		setFormData({
			id: provider.id, // Include the unique identifier
			name: provider.proName,
			type: provider.proType,
			addressLine1: provider.proAdd1,
			addressLine2: provider.proAdd2,
			city: provider.proCity,
			stateOrProvince: provider.proProv,
			zipOrPostal: provider.proZip,
			mainPhone: provider.proPhone1,
			secondaryPhone: provider.proPhone2,
		});
		setView("form");
	};
	const customModalStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			width: "350px",
			height: "475px",
		},
	};
	return (
		<div className="form-container">
			<button className="button" onClick={toggleView}>
				{view === "list" ? "Add Healthcare Provider" : "List View"}
			</button>

			{view === "form" && (
				<form onSubmit={handleSubmit} className="provider-form">
					<div className="form-row">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
						/>
					</div>

					<div className="form-row">
						<label htmlFor="type">Type:</label>
						<select
							id="type"
							name="type"
							value={formData.type}
							onChange={handleChange}
						>
							<option value="Allergist">Allergist</option>
							<option value="Cardiologist">Cardiologist</option>
							<option value="Dermatologist">Dermatologist</option>
							<option value="Dietitian">Dietitian</option>
							<option value="Endocrinologist">Endocrinologist</option>
							<option value="Neurologist">Neurologist</option>
							<option value="Nurse">Nurse</option>
							<option value="Obstetricians">Obstetricians</option>
							<option value="Oncologist">Oncologist</option>
							<option value="Pediatrician">Pediatrician</option>
							<option value="Pharmacist">Pharmacist</option>
							<option value="Physician" selected>
								Physician
							</option>
							<option value="PSW">PSW (Personal Support Worker)</option>
							<option value="Psychiatrist">Psychiatrist</option>
							<option value="Pulmonologist">Pulmonologist</option>
							<option value="Specialist">Specialist</option>
							<option value="Surgeon">Surgeon</option>
							<option value="Therapist">Therapist</option>
						</select>
					</div>

					<div className="form-row">
						<label htmlFor="addressLine1">Address:</label>
						<input
							type="text"
							id="addressLine1"
							name="addressLine1"
							value={formData.addressLine1}
							onChange={handleChange}
						/>
					</div>

					<div className="form-row">
						<input
							type="text"
							id="addressLine2"
							name="addressLine2"
							value={formData.addressLine2}
							onChange={handleChange}
						/>
					</div>

					<div className="form-row multi-field">
						<div>
							<label htmlFor="city">City:</label>
							<input
								type="text"
								id="city"
								name="city"
								value={formData.city}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor="stateOrProvince">State/Prov:</label>
							<input
								type="text"
								id="stateOrProvince"
								name="stateOrProvince"
								value={formData.stateOrProvince}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor="zipOrPostal">Zip/Postal:</label>
							<input
								type="text"
								id="zipOrPostal"
								name="zipOrPostal"
								value={formData.zipOrPostal}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="form-row multi-field">
						<div>
							<label htmlFor="mainPhone">Phone:</label>
							<input
								type="text"
								id="mainPhone"
								name="mainPhone"
								value={formData.mainPhone}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor="secondaryPhone">Alt Phone:</label>
							<input
								type="text"
								id="secondaryPhone"
								name="secondaryPhone"
								value={formData.secondaryPhone}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="form-buttons">
						<button
							type="button"
							onClick={handleCancel}
							className="cancel-button"
						>
							Cancel
						</button>
						<button type="submit" className="submit-button">
							Submit
						</button>
					</div>
				</form>
			)}

			{view === "list" && (
				<div className="providers-list-container">
					{providers.map((provider, index) => (
						<div key={index} className="provider-item">
							<div className="row">
								<div>
									<strong>Name:</strong> {provider.proName}
								</div>
								<div>
									<strong>Type:</strong> {provider.proType}
								</div>
							</div>
							<div className="row">
								<div>
									<strong>Address:</strong> {provider.proAdd1}
								</div>
							</div>
							<div className="row">
								<div>{provider.proAdd2}</div>
							</div>
							<div className="row">
								<div>
									<strong>City:</strong> {provider.proCity}
								</div>
								<div>
									<strong>State/Prov:</strong> {provider.proProv}
								</div>
								<div>
									<strong>Zip/Postal:</strong> {provider.proZip}
								</div>
							</div>
							<div className="row">
								<div>
									<strong>Phone:</strong> {provider.proPhone1}
								</div>
								<div>
									<strong>Alt Phone:</strong> {provider.proPhone2}
								</div>
							</div>
							<div className="provider-actions">
								<button
									onClick={() => handleEdit(provider)}
									className="edit-button"
								>
									Edit
								</button>
								<button
									onClick={() => openModal(provider.id)}
									className="delete-button"
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customModalStyles}
			>
				<div className="modal-content">
					<img src={logo} alt="trackRX Logo" className="modal-image" />
					<h2>Confirm Delete</h2>
					<p>This action cannot be reversed!</p>
					<p>Are you sure you want to delete this health care provider?</p>
					<div className="modal-buttons">
						<button onClick={confirmDelete}>Yes, Delete it</button>
						<button onClick={closeModal}>Cancel</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default HealthcareProviderForm;
