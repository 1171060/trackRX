// indexedDB.js

// Function to open a database
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("HealthDatabase", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Create 'Meds' object store
      if (!db.objectStoreNames.contains("Meds")) {
        const medsStore = db.createObjectStore("Meds", {
          keyPath: "medID",
          autoIncrement: true,
        });

        // Create indexes for Meds
        medsStore.createIndex("name", "name", { unique: false });
        medsStore.createIndex("startDate", "startDate", { unique: false });
        medsStore.createIndex("endDate", "endDate", { unique: false });
        medsStore.createIndex("dosage", "dosage", { unique: false });
        medsStore.createIndex("frequency", "frequency", { unique: false });
        medsStore.createIndex("instructions", "instructions", {
          unique: false,
        });
        medsStore.createIndex("reactions", "reactions", { unique: false });
        medsStore.createIndex("notes", "notes", { unique: false });
        medsStore.createIndex("groupTracks", "groupTracks", {
          unique: false,
          multiEntry: true,
        });
      }

      // Create 'GroupTracks' object store
      if (!db.objectStoreNames.contains("GroupTracks")) {
        const groupTracksStore = db.createObjectStore("GroupTracks", {
          keyPath: "id",
          autoIncrement: true,
        });
        groupTracksStore.createIndex("name", "name", { unique: true });
      }
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
}
