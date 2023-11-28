import { useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  // useEffect(() => {
  //   // Open (or create) the database
  //   const open = indexedDB.open("MyDatabase", 1);

  //   // Create the schema
  //   open.onupgradeneeded = () => {
  //     const db = open.result;
  //     db.createObjectStore("MyObjectStore", { keyPath: "id" });
  //   };

  //   open.onsuccess = () => {
  //     // Start a new transaction
  //     const db = open.result;
  //     const tx = db.transaction("MyObjectStore", "readwrite");
  //     const store = tx.objectStore("MyObjectStore");

  //     // Add some data
  //     store.put({ id: 1, name: "John Doe", age: 42 });

  //     // Close the db when the transaction is done
  //     tx.oncomplete = () => db.close();
  //   };
  // }, []);

  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
