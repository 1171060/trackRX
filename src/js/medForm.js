import React, { useState, useEffect } from "react";

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
  const [groupTasks, setGroupTasks] = useState([]);

  useEffect(() => {
    // Load group tasks from IndexedDB and set them in state
    // Placeholder function - replace with actual IndexedDB fetching logic
    const fetchGroupTasks = async () => {
      // Fetch group tasks and update state
      // setGroupTasks(fetchedGroupTasks);
    };

    fetchGroupTasks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // Save the data to IndexedDB or process it as needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={medName}
        onChange={(e) => setMedName(e.target.value)}
        placeholder="Medication Name"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input
        type="text"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        placeholder="Dosage"
      />
      <input
        type="text"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        placeholder="Frequency"
      />
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
      />
      <textarea
        value={reactions}
        onChange={(e) => setReactions(e.target.value)}
        placeholder="Reactions"
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
      />
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default MedForm;
