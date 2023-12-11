function openDatabase() {
	return new Promise((resolve, reject) => {
		// Define the database version
		const DB_VERSION = 4;
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

			// Create 'GroupTracks' object store if it doesn't exist
			if (!db.objectStoreNames.contains("GroupTracks")) {
				db.createObjectStore("GroupTracks", {
					keyPath: "id",
					autoIncrement: true,
				});
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
