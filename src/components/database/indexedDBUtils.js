const DB_VERSION = 3;

function openIndexedDB(dbName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, DB_VERSION);

    request.onupgradeneeded = (event) => {
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

      // Create 'GroupTracks' object store
      if (!db.objectStoreNames.contains("GroupTracks")) {
        const groupTracksStore = db.createObjectStore("GroupTracks", {
          keyPath: "id",
          autoIncrement: true,
        });
        groupTracksStore.createIndex("name", "name", { unique: true });
      }
    };

    request.onerror = (event) => {
      reject("IndexedDB error:", event.target.error);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

// Fetch data from a store
async function fetchFromIndexedDB(dbName, storeName) {
  const db = await openIndexedDB(dbName, DB_VERSION);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject("Fetch error:", event.target.error);
    };
  });
}

async function updateRecordInIndexedDB(dbName, storeName, record) {
  const db = await openIndexedDB(dbName, DB_VERSION);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(record);

    request.onsuccess = () => {
      resolve("Record updated successfully");
    };

    request.onerror = (event) => {
      reject("Error updating record:", event.target.error);
    };
  });
}

async function addRecordToIndexedDB(dbName, storeName, record) {
  const db = await openIndexedDB(dbName, DB_VERSION);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add(record);

    request.onsuccess = () => {
      resolve("Record added successfully");
    };

    request.onerror = (event) => {
      reject("Error adding record:", event.target.error);
    };
  });
}
async function getRecordById(dbName, storeName, id) {
  const db = await openIndexedDB(dbName, 1); // Adjust the version number as needed
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject("Fetch error:", event.target.error);
    };
  });
}

export {
  openIndexedDB,
  fetchFromIndexedDB,
  addRecordToIndexedDB,
  updateRecordInIndexedDB,
  getRecordById,
};
