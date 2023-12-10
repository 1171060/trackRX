function createNote(noteContent) {
  const transaction = db.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);
  const note = { content: noteContent, created: new Date() };
  store.add(note);
}

function readNote(id) {
  const transaction = db.transaction([storeName]);
  const store = transaction.objectStore(storeName);
  const request = store.get(id);

  request.onsuccess = () => {
    if (request.result) {
      console.log("Note:", request.result);
    } else {
      console.log("No such note found");
    }
  };

  request.onerror = (event) => {
    console.log("Error in reading note:", event.target.errorCode);
  };
}

function updateNote(id, newContent) {
  const transaction = db.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);
  const request = store.get(id);

  request.onsuccess = () => {
    const note = request.result;
    note.content = newContent;
    store.put(note);
  };
}

function deleteNote(id) {
  const transaction = db.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);
  store.delete(id);
}
