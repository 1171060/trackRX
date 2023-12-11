import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import Meds from "../../components/database/Meds";
import { fetchFromIndexedDB } from "../../components/database/indexedDBUtils";

import "./medsList.css";

import trashCan from "../../assets/images/delete-forever-outline_on.png";
import editMed from "../../assets/images/edit3.png";
import medCat from "../../assets/images/grouping.png";

function MedsList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div style={{ margin: "15px" }}>
      {meds.map((item) => (
        <div className="medItem" key={item.medId}>
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
            <a
              href="#"
              onClick={() => props.onEditMed(item.id)} // Use item.id as medId
              className="actionLink"
            >
              <img src={editMed} className="actionIcon" alt="Edit" />
              <span>Edit</span>
            </a>
            <a href="#" className="actionLink" title="Group this medication">
              <img src={medCat} className="actionIcon" alt="Group" />
              <span>Group</span>
            </a>
            <a href="#" className="actionLink" title="Delete this medication">
              <img src={trashCan} className="actionIcon" alt="Delete" />
              <span>Delete</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MedsList;
