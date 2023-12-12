import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchFromIndexedDB,
  deleteRecordFromIndexedDB,
  addRecordToIndexedDB,
  updateRecordInIndexedDB,
  getRecordById,
} from "../../components/database/indexedDBUtils"; // Import the deleteRecordFromIndexedDB function
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router";

import "./medsList.css";

import trashCan from "../../assets/images/delete-forever-outline_on.png";
import editMed from "../../assets/images/edit3.png";
import medCat from "../../assets/images/grouping.png";

function MedsList(props) {
  const [meds, setMeds] = useState([]);

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

  if (meds.length === 0) {
    return <div style={{ margin: "15px" }}>No records found</div>;
  }

  const handleDeleteMed = async (medID) => {
    try {
      // Call the deleteRecordFromIndexedDB function to delete the medication record
      await deleteRecordFromIndexedDB("HealthDatabase", "Meds", medID);

      // Update the state to remove the deleted medication
      const updatedMeds = meds.filter((item) => item.medID !== medID);
      setMeds(updatedMeds);
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const handleEditMed = (medID) => {
    // You can implement your edit functionality here or pass it to the parent component
    // For example, you can navigate to an edit page with the medID.
    // props.onEditMed(medID); // Call the parent's edit function with the medID
  };

  return (
    <div style={{ margin: "15px" }}>
      {meds.map((item) => (
        <div className="medItem" key={item.medID}>
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
            <div
              onClick={() => handleDeleteMed(item.medID)} // Call handleDeleteMed when the "Delete" button is clicked
              className="actionLink"
            >
              <img src={trashCan} className="actionIcon" alt="Delete" />
              <span>Delete</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MedsList;
