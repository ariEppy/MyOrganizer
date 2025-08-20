import React, { useState, useEffect } from 'react';
import './Calendar.css';



const Calendar = () => {
  //const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [loaded, setLoaded] = useState(false); 
  const [today, setToday] = useState(new Date());

  // Function to update the "today" blue box
  useEffect(() => {
  const updateToday = () => setToday(new Date());

  const now = new Date();
  const msUntilMidnight =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

  const timeoutId = setTimeout(() => {
    updateToday();
    setInterval(updateToday, 24 * 60 * 60 * 1000);
  }, msUntilMidnight);


  return () => clearTimeout(timeoutId);
}, []);

  // Save my notes to the localStorage when notes/currentdate/loaded changes/page starts/renders
  useEffect(() => {
    //if loaded = true then set the key: calendar notes with notes and currentdate
    if (loaded) {
      localStorage.setItem('calendar-notes',
        JSON.stringify({ notes, currentDate })
      );
    }
  }, [notes, currentDate, loaded]);
  
  
// Load tasks from localStorage when the page starts/rerenders
useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('calendar-notes'));
    if (saved) {
      if (saved.notes) 
        setNotes(saved.notes);
      if (saved.currentDate) {
        const parsedDate = new Date(saved.currentDate);
        if (!isNaN(parsedDate)) {
          setCurrentDate(parsedDate);
        }
      }
    }
    setLoaded(true);

   
  }, []);
  
  //when the user clicks on a day
  const handleDayClick = (day) => {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (selectedDate === dateKey) {
      setSelectedDate(null);
      setNoteInput('');
    } else {
      setSelectedDate(dateKey);
      setNoteInput(notes[dateKey] || '');
    }
  };
  
  
  //this gets the amount of days in a certain month/year
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  //arrows to move forward or back a month
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  //when the user clicks add note/enter to write on the calendar
  const handleNoteSave = () => {
    if (!selectedDate) 
      return;
  
    setNotes(prevNotes => ({
      ...prevNotes,
      [selectedDate]: noteInput.trim()
    }));
  
    setSelectedDate(null);
    setNoteInput('');
  };
  
  //format the date for saving to local storage
  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = new Date(year, month, 1).getDay(); 

  //checks which day is today (so that we can highlight it)
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>←</button>
        <h2 style={{borderBottom: 'none' }}>
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button onClick={handleNextMonth}>→</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="calendar-day-label">{d}</div>
        ))}

        {[...Array(firstDayIndex)].map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty" />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateKey = formatDateKey(year, month, day);
          return (
            <div
              key={day}
              className={`calendar-day ${isToday(day) ? 'today' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <div className="day-number">{day}</div>
              {notes[dateKey] && (
              <div className="note-text">
             {notes[dateKey]}
             </div>
            )}


            </div>
          );
        })}
      </div>

      {selectedDate && (
  <div className="note-popup">
    <div className="popup-header">
      <h4>Set Reminder-</h4>
      <button className="close-btn" onClick={() => setSelectedDate(null)}>×</button>
    </div>
    <textarea
      value={noteInput}
      onChange={(e) => setNoteInput(e.target.value)}
      rows={4}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleNoteSave();
        }
      }}
    />
    <button className="add-btn" onClick={handleNoteSave}>Add Note</button>
  </div>
)}

    </div>
  );
};

export default Calendar;
