function openDatabase() {
	return new Promise((resolve, reject) => {
		// Define the database version
		const DB_VERSION = 11;
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

export { openDatabase };
