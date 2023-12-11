import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addRecordToIndexedDB,
  updateRecordInIndexedDB,
  getRecordById,
} from "../components/database/indexedDBUtils";
import ConditionalHeader from "../components/ConditionalHeader";

function MedForm() {
  const [medName, setMedName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [instructions, setInstructions] = useState("");
  const [reactions, setReactions] = useState("");
  const [notes, setNotes] = useState("");
  const [groupTrack, setGroupTrack] = useState("");
  const [groupTasks, setGroupTasks] = useState([
    { id: "default", name: "General" },
  ]);

  const navigate = useNavigate();
  const { medId } = useParams();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (medId) {
      // Fetch medication data when medId is available
      const fetchMedicationData = async () => {
        try {
          const medData = await getRecordById("HealthDatabase", "Meds", medId);
          if (medData) {
            // Set state with fetched data
            setMedName(medData.medName);
            setStartDate(medData.startDate);
            setEndDate(medData.endDate);
            setDosage(medData.dosage);
            setFrequency(medData.frequency);
            setInstructions(medData.instructions);
            setReactions(medData.reactions);
            setNotes(medData.notes);
            setGroupTrack(medData.groupTrack);
          } else {
            console.log("No data found for ID:", medId);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchMedicationData();
    } else {
      // Clear the form when there's no medId
      clearForm();
    }
  }, [medId]);

  const clearForm = () => {
    setMedName("");
    setStartDate("");
    setEndDate("");
    setDosage("");
    setFrequency("");
    setInstructions("");
    setReactions("");
    setNotes("");
    setGroupTrack("");
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!medName) {
      formIsValid = false;
      errors["medName"] = "Medication name is required.";
    }

    if (!startDate) {
      formIsValid = false;
      errors["startDate"] = "Start date is required.";
    }

    if (!dosage) {
      formIsValid = false;
      errors["dosage"] = "Dosage is required.";
    }

    if (!frequency) {
      formIsValid = false;
      errors["frequency"] = "Frequency is required.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.error("Validation failed");
      return;
    }
    const medData = {
      medName,
      startDate,
      endDate,
      dosage,
      frequency,
      instructions,
      reactions,
      notes,
      groupTrack,
    };

    try {
      if (medId) {
        // Update existing record
        await updateRecordInIndexedDB("HealthDatabase", "Meds", {
          ...medData,
          id: medId,
        });
        console.log("Record updated successfully");
      } else {
        // Add new record
        await addRecordToIndexedDB("HealthDatabase", "Meds", medData);
        console.log("Record added successfully");
      }
      navigate("/meds");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Function to navigate back to the "meds" page
  const handleCancel = () => {
    navigate("/meds");
  };

  const isNewRecord = !medId;

  return (
    <div className="med-form">
      <ConditionalHeader isNewRecord={isNewRecord} />
      <form onSubmit={handleSubmit} className="med-form">
        <div className="row">
          <label>Medication Name:</label>
          <input
            type="text"
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            required
          />
          {errors.medName && <p className="error">{errors.medName}</p>}
        </div>

        <div className="row">
          <div className="date-input">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            {errors.startDate && <p className="error">{errors.startDate}</p>}
          </div>
          <div className="date-input">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="half-width">
            <label>Dosage:</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
            />
            {errors.dosage && <p className="error">{errors.dosage}</p>}
          </div>
          <div className="half-width">
            <label>Frequency:</label>
            <input
              type="text"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            />
            {errors.frequency && <p className="error">{errors.frequency}</p>}
          </div>
        </div>

        <div className="row">
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
          {errors.instructions && (
            <p className="error">{errors.instructions}</p>
          )}
        </div>

        <div className="row">
          <label>My Reactions To Med:</label>
          <textarea
            value={reactions}
            onChange={(e) => setReactions(e.target.value)}
          ></textarea>
        </div>

        <div className="row">
          <label>Notes About Med:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="row">
          <div className="select-container">
            <label>Select a Group/Track:</label>
            <select
              value={groupTrack}
              onChange={(e) => setGroupTrack(e.target.value)}
            >
              <option value="">Select a Group/Track</option>
              {groupTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.name}
                </option>
              ))}
            </select>
          </div>
          <div className="submit-container">
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MedForm;
