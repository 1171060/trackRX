const dbName = "trackRX";
const storeName = "meds";

let db;

// Open (or create) the database
const openRequest = indexedDB.open(dbName, 1);

openRequest.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
};

openRequest.onsuccess = (event) => {
  db = event.target.result;
};

openRequest.onerror = (event) => {
  console.error("IndexedDB error:", event.target.errorCode);
};
