const DB_VERSION = 17;

function openDatabase() {
  return new Promise((resolve, reject) => {
    // Define the database version

    const dbName = "HealthDatabase";

    // Open a connection to the database
    const request = indexedDB.open(dbName, DB_VERSION);

    // This event handles the creation of stores or indexes
    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Create 'Meds' object store if it doesn't exist
      if (!db.objectStoreNames.contains("Meds")) {
        const medsStore = db.createObjectStore("Meds", {
          keyPath: "medID",
          autoIncrement: true,
        });

        // Create indexes for 'Meds' store
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

      let groupTracksStore;
      if (!db.objectStoreNames.contains("GroupTracks")) {
        groupTracksStore = db.createObjectStore("GroupTracks", {
          keyPath: "id",
          autoIncrement: true,
        });
      } else {
        groupTracksStore = event.target.transaction.objectStore("GroupTracks");
      }

      // Create an index for 'type' if it does not already exist
      if (!groupTracksStore.indexNames.contains("type")) {
        groupTracksStore.createIndex("type", "type", { unique: false });
      }
      // Create 'HealthProfessionals' object store if it doesn't exist
      if (!db.objectStoreNames.contains("HealthProfessionals")) {
        const healthProStore = db.createObjectStore("HealthProfessionals", {
          keyPath: "proID",
          autoIncrement: true,
        });

        // Create indexes for 'HealthProfessionals' store
        healthProStore.createIndex("proName", "proName", { unique: false });
        healthProStore.createIndex("proType", "proType", { unique: false });
        healthProStore.createIndex("proAdd1", "proType", { unique: false });
        healthProStore.createIndex("proAdd2", "proAdd2", { unique: false });
        healthProStore.createIndex("proCity", "proCity", { unique: false });
        healthProStore.createIndex("proProv", "proProv", { unique: false });
        healthProStore.createIndex("proZip", "proZip", { unique: false });
        healthProStore.createIndex("proPhone1", "proPhone1", { unique: false });
        healthProStore.createIndex("proPhone2", "proPhone2", { unique: false });
        healthProStore.createIndex("proNext", "proNext", { unique: false });

        // Add more indexes for other fields as needed
      }
    };

    // Handle errors when opening the database
    request.onerror = function (event) {
      console.error("Database error:", event.target.error);
      reject(event.target.error);
    };

    // Handle successful database opening
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
}
// Function to add a health professional
export function addHealthProfessional(healthProfessional) {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(
          ["HealthProfessionals"],
          "readwrite"
        );
        const store = transaction.objectStore("HealthProfessionals");
        const request = store.add(healthProfessional);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Function to add a group track
export function addGroupTrack(groupTrack) {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(["GroupTracks"], "readwrite");
        const store = transaction.objectStore("GroupTracks");
        const request = store.add(groupTrack);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function fetchHealthProfessionals() {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then((db) => {
        const transaction = db.transaction(["HealthProfessionals"], "readonly");
        const store = transaction.objectStore("HealthProfessionals");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function deleteHealthProfessional(dbName, storeName, id) {
  return new Promise((resolve, reject) => {
    openDatabase(dbName)
      .then((db) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
      })
      .catch((error) => reject(error));
  });
}

export function updateHealthProfessional(dbName, storeName, providerData) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, DB_VERSION);

    request.onerror = (event) => {
      console.error("Database error:", event.target.errorCode);
      reject(event.target.errorCode);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const updateRequest = store.put(providerData);

      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = (event) => reject(event.target.error);
    };
  });
}

export { openDatabase };
