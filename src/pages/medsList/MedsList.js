import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Meds from "../../components/database/Meds";
import "./medsList.css";

import logo from "../../assets/images/logoB.png";
import addMeds from "../../assets/images/pill-multiple_on.png";
import medsSearch from "../../assets/images/search4.png";
import trashCan from "../../assets/images/delete-forever-outline_on.png";
import editMed from "../../assets/images/edit3.png";
import medCat from "../../assets/images/grouping.png";

function MedsList(props) {
  return (
    <div style={{ margin: "10px" }}>
      <div className="menuContainer">
        <div>
          <img src={addMeds} className="addMeds" /> Add New Med(s)
        </div>
        <div>
          <input type="text" placeholder="Search " />{" "}
          <img src={medsSearch} className="medsSearch" />
        </div>
      </div>
      <div className="medsListContainer">
        {Meds && Meds.length > 0 ? (
          Meds.map((item) => (
            <div className="medItem" key={item.id}>
              <div className="row">
                <div>
                  <strong>Name:</strong> {item.medName}
                </div>
                <div>
                  <strong>Start Date:</strong> {item.medStartDate}
                </div>
                <div>
                  <strong>End Date:</strong> {item.medEndDate}
                </div>
              </div>
              <div className="row">
                <div>
                  <strong>Dosage:</strong> {item.medDose}
                </div>
                <div>
                  <strong>Frequency:</strong> {item.medFrequency}
                </div>
              </div>
              <div className="row">
                <div>
                  <strong>Instructions:</strong> {item.medInstructions}
                </div>
              </div>
              <div className="row">
                <div>
                  <strong>Reactions:</strong> {item.medReactions}
                </div>
                <div>
                  <strong>Notes:</strong> {item.medNotes}
                </div>
              </div>
              <div className="medActions">
                <a
                  href="#"
                  //onClick={() => onEditMed(item)}
                  className="actionLink"
                  title="Edit this medication"
                >
                  <img src={editMed} className="actionIcon" alt="Group" />
                  <span>Edit</span>
                </a>
                <a
                  href="#"
                  className="actionLink"
                  title="Group this medication"
                >
                  <img src={medCat} className="actionIcon" alt="Group" />
                  <span>Group</span>
                </a>
                <a
                  href="#"
                  className="actionLink"
                  title="Delete this medication"
                >
                  <img src={trashCan} className="actionIcon" alt="Delete" />
                  <span>Delete</span>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div>No records found</div>
        )}
      </div>

      <div className="menuContainer">{/* Your menu container content */}</div>
    </div>
  );
}

export default MedsList;
