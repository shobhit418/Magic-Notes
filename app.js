const NOTES_LOCAL_STORAGE_KEY = "notes";

class Note {
    constructor(content = "") {
        this.uuid = crypto.randomUUID();
        this.content = content;
    }

var currentColor = "rgb(255, 255, 255)";

    /**
     * This function creates a Note object from an object. This is useful for converting the response from JSON.parse
     * into a usable Note object.
     * @param {Object} obj - The object to convert to a Note object.
     * @returns {Note} A Note with the properties of the given object.
     * @example
     *   Note.fromObj({uuid: "00000000-0000-4000-0000-000000000000", content: "Some text"})
     */
    static fromObj(obj) {
        return Object.assign(new Note(), obj);
    }
}

/**
 * This function gets notes from local storage
 * @returns {Array.<Note>} An array of Note objects.
 */
function getNotes() {
    const jsonObjs = localStorage.getItem(NOTES_LOCAL_STORAGE_KEY) || "[]";
    const objs = JSON.parse(jsonObjs);
    return objs.map((obj) => Note.fromObj(obj));
}

/**
 * This function saves an array of Note objects to local storage
 * @param {Array.<Note>} notes - The notes array that we want to save to local storage.
 */
function saveNotes(notes) {
    const jsonNotes = JSON.stringify(notes);
    localStorage.setItem(NOTES_LOCAL_STORAGE_KEY, jsonNotes);
}

/**
 * This function saves a new note to local storage
 * @param {Note} note - The note to add to the list of notes.
 */
function saveNewNote(note) {
    const notes = getNotes();
    notes.push(note);
    saveNotes(notes);
}

/**
 * This function removes any note referenced by the given uuid from local storage and updates the visible notes.
 * @param {string} uuid - The uuid of the note to remove.
 */
function deleteNote(uuid) {
    const notes = getNotes();
    const newNotes = notes.filter((note) => note.uuid !== uuid);
    saveNotes(newNotes);
    updateDisplayedNotes();
}

/**
 * This function delete all notes from the page.
 */
function deleteAllNotes() {
    saveNotes([]);
    updateDisplayedNotes();
}

/**
 * This function displays the notes (filtered by search text) on the page
 */
function updateDisplayedNotes() {
    const searchText = document.getElementById("searchTxt").value;
    const notes = getNotes();
    const matchedNotes = notes.filter((note) => note.content.includes(searchText.toLowerCase()));

    const notesContainerEle = document.getElementById("notes");

    if (matchedNotes.length === 0) {
        notesContainerEle.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
        document.getElementById('delAllBtn').disabled = true;
    } else {
        const notesHtml = matchedNotes.map(function (note, index) {
            return `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem; box-shadow: 0 0 10px #333">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${note.content}</p>
                        <button id="${note.uuid}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
        });
        document.getElementById('delAllBtn').disabled = false;
        notesContainerEle.innerHTML = notesHtml.join("\n");
    }
}

// Enables/disables the add button when the input field is updated
document.getElementById("addTxt").addEventListener("input", (e) => {
    const trimmedInputText = e.target.value.trim();
    document.getElementById("addBtn").disabled = trimmedInputText.length === 0;
});

// Adds a new note when the add button is clicked
document.getElementById("addBtn").addEventListener("click", (e) => {
    e.target.disabled = true;
    const noteContent = document.getElementById("addTxt").value;
    const note = new Note(noteContent);
    saveNewNote(note);
    document.getElementById("addTxt").value = "";
    updateDisplayedNotes();
});

// Updates the visible notes when the search field is updated
document.getElementById("searchTxt").addEventListener("input", () => {
    updateDisplayedNotes();
});

/** 
 * Deletes all notes when the delete all button is triggered.
 * Confirms with a prompt that requires to enter the word delete 
 * If failed, alerts with the error message.
 */
document.getElementById('delAllBtn').addEventListener('click', () => {
    const isDelete = prompt("Alert! You are about to remove all your notes. Type in \"delete\" to confirm.") === 'delete';
    if(isDelete) return deleteAllNotes();

    alert("Couldn't proceed. WARNING: case-sensitive");
});

console.log("Welcome to notes app. This is app.js");
updateDisplayedNotes();  // Initialize with saved notes

function changeColor(string) {
    var button = document.getElementById(string);

    if(button.value == "btn1"){
      currentColor = "rgb(0, 255, 255)";
    }
    else if(button.value == "btn2"){
      currentColor = "rgb(255, 215, 0)";
    }
    else if(button.value == "btn3"){
      currentColor = "rgb(255, 105, 180)";
    }
    showNotes();
}

function changeColor(string) {
    var button = document.getElementById(string);

    if(button.value == "btn1"){
      currentColor = "rgb(0, 255, 255)";
    }
    else if(button.value == "btn2"){
      currentColor = "rgb(255, 215, 0)";
    }
    else if(button.value == "btn3"){
      currentColor = "rgb(255, 105, 180)";
    }
    showNotes();
}

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/
