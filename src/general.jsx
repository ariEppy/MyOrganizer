import React, { useState, useEffect } from 'react';
import './Goals.css';

const GeneralNotes = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("general-notes"));
    if (stored) {
      setNotes(stored);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("general-notes", JSON.stringify(notes));
    }
  }, [notes, loaded]);

  const addNote = () => {
    if (note.trim()) {

      setNotes([...notes, { id: Date.now(), text: note }]);
      setNote('');
    }
  };

  const updateNote = (id, newText) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, text: newText } : n)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="goals-container">
      <h2>Notes</h2>

      <div className="goals-green">
      <div className="goal-input">
        <input 
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNote();
            }
          }}
          placeholder="Add a Note"
        />
      </div>

      <div
        
        style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}
      >
        {notes.map((n) => (
          <div
            key={n.id}
            style={{
              position: "relative",
              margin: "5px",
              width: "200px",
              height: "200px",
              border: "1px solid #333",
              paddingTop: "2em",
            }}
          >
            <button
              onClick={() => deleteNote(n.id)}
              style={{
                position: "absolute",
                right: "5px",
                top: "5px",
                cursor: "pointer",
                border: "none",
                background: "transparent",
                fontSize: "18px",
              }}
            >
              ✕
            </button>
            <textarea
              value={n.text}
              onChange={(e) => updateNote(n.id, e.target.value)}
              style={{
                width: "95%",
                height: "100%",
                border: "none",
                backgroundColor: "transparent",
                resize: "none",
                outline: "none",
                padding: "10px",
                boxSizing: "border-box",
                overflowY: "auto",
                  scrollbarWidth: "thin",           
    scrollbarColor: "#000000ff #98ac8d", 

              }}
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default GeneralNotes;
