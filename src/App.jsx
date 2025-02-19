import React, { useState } from "react";
import "./App.css";

function App() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);

  const changeTitleHandler = (e) => {
    setNoteTitle(e.target.value);
  };

  const changeBodyHandler = (e) => {
    setNoteBody(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (noteTitle.trim().length === 0 || noteBody.trim().length === 0) {
      return alert("Please enter both a note title and body");
    }
    editMode ? updateHandler() : createHandler();
  };

  const createHandler = () => {
    const newNote = {
      id: Date.now() + "",
      title: noteTitle,
      body: noteBody,
      timestamp:
        new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        new Date().toLocaleTimeString(),
    };

    setNotes([...notes, newNote]);
    setNoteTitle("");
    setNoteBody("");
  };

  const removeHandler = (noteId) => {
    const updatedNotes = notes.filter((item) => item.id !== noteId);
    setNotes(updatedNotes);
  };

  const editHandler = (note) => {
    setEditMode(true);
    setEditableNote(note);
    setNoteTitle(note.title);
    setNoteBody(note.body);
  };

  const updateHandler = () => {
    const updatedNotes = notes.map((item) => {
      if (item.id === editableNote.id) {
        return {
          ...item,
          title: noteTitle,
          body: noteBody,
          timestamp:
            new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }) +
            " " +
            new Date().toLocaleTimeString(),
        };
      }
      return item;
    });

    setNotes(updatedNotes);
    setEditMode(false);
    setNoteTitle("");
    setNoteBody("");
    setEditableNote(null);
  };

  return (
    <div className="App">
      <header>MyNotes</header>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={noteTitle}
          onChange={changeTitleHandler}
          placeholder="Note Title"
        />
        <textarea
          value={noteBody}
          onChange={changeBodyHandler}
          placeholder="Note Body"
        ></textarea>
        <button type="submit">{editMode ? "Update Note" : "Add Note"}</button>
      </form>

      <div className="note-list">
        <h2>All Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.title}</span>
              <p>{note.body}</p>
              <small>{note.timestamp}</small>
              <button onClick={() => editHandler(note)}>Edit</button>
              <button onClick={() => removeHandler(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
