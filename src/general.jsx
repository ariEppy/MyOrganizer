import React, { useState, useEffect } from 'react';
import './TodoList.css'; 

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

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>Notes</h2>
      <div className='inner'>
        <div className="task-list">
          <ul>
            {notes.map((n) => (
              <li key={n.id} >
                <span>{n.text}</span>
                <button
                  onClick={() => deleteNote(n.id)}           
                  aria-label="Delete note"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="task-input">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNote();
              }
            }}
            placeholder="Write a note"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralNotes;
