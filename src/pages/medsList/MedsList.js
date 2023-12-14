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
  const { searchQuery } = props;
  const [meds, setMeds] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medsData = await fetchFromIndexedDB("HealthDatabase", "Meds");
        console.log(medsData); // Check the structure here
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
      height: "475px",
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

  const filteredMeds = meds.filter((med) => {
    const query = searchQuery.toLowerCase();

    const matchesGroupTracks =
      med.groupTracks?.some((groupTrack) =>
        groupTrack.toLowerCase().includes(query)
      ) || false;

    const matchesStartDate =
      med.startDate && med.startDate.includes(searchQuery);
    const matchesEndDate = med.endDate && med.endDate.includes(searchQuery);

    return (
      med.medName.toLowerCase().includes(query) ||
      med.dosage.toLowerCase().includes(query) ||
      med.frequency.toLowerCase().includes(query) ||
      med.instructions.toLowerCase().includes(query) ||
      med.reactions.toLowerCase().includes(query) ||
      med.notes.toLowerCase().includes(query) ||
      matchesGroupTracks ||
      matchesStartDate ||
      matchesEndDate
    );
  });
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  if (filteredMeds.length === 0) {
    return <div style={{ margin: "15px" }}>No records found</div>;
  }

  return (
    <div style={{ margin: "15px" }}>
      {filteredMeds.map((item, index) => (
        <div className="medItem" key={index}>
          <div className="row">
            <div>
              <strong>Name:</strong> {highlightText(item.medName, searchQuery)}
            </div>
            <div>
              <strong>Start Date:</strong>{" "}
              {highlightText(item.startDate, searchQuery)}
            </div>
            <div>
              <strong>End Date:</strong>{" "}
              {highlightText(item.endDate, searchQuery)}
            </div>
          </div>
          <div className="row">
            <div>
              <strong>Dosage:</strong> {highlightText(item.dosage, searchQuery)}
            </div>
            <div>
              <strong>Frequency:</strong>{" "}
              {highlightText(item.frequency, searchQuery)}
            </div>
          </div>
          <div className="row">
            <div>
              <strong>Instructions:</strong>{" "}
              {highlightText(item.instructions, searchQuery)}
            </div>
          </div>
          <div className="row">
            <div>
              <strong>Reactions:</strong>{" "}
              {highlightText(item.reactions, searchQuery)}
            </div>
            <div>
              <strong>Notes:</strong> {highlightText(item.notes, searchQuery)}
            </div>
          </div>
          <div className="row">
            <div>
              <strong>Groups/Tracks:</strong>
              {item.groupTracks && Array.isArray(item.groupTracks) ? (
                <ul>
                  {item.groupTracks.map((track, index) => (
                    <li key={index}>{highlightText(track, searchQuery)}</li>
                  ))}
                </ul>
              ) : (
                <p>No group tracks assigned</p>
              )}
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
          <p>This action cannot be reversed!</p>
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
