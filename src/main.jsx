import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import TodoList from './TodoList.jsx';
import SideMenu from './SideMenu.jsx';
import WeekList from './WeekList.jsx';
import General from './general.jsx';
import Calendar from './Calendar.jsx';
import TodayAppointment from './TodayAppointment';

function MainApp() {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('calendar-notes'));
    if (saved?.notes) {
      setNotes(saved.notes);
    }
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <SideMenu />
        <div style={{ marginLeft: '250px', flex: 1 }}>
          <Routes>
            {/* 🏠 Homepage shows both Today's List and Week's List */}
            <Route
              path="/"
              element={
                <div style={{ display: 'flex', gap: '2rem', paddingRight: '2rem', marginLeft: '5%' }}>
                  <div style={{ flex: 1 }}>
                    <TodoList />
                  </div>
                  <div style={{ flex: 1 }}>
                    <WeekList />
                  </div>
                  <div  style={{ flex: 1 }}>
                    <TodayAppointment notes={notes} />
                  </div>
                </div>
              }
            />

            {/* Optional: individual pages */}
            <Route path="/today" element={<TodoList />} />
            <Route path="/week" element={<WeekList />} />
            <Route path="/general" element={<General />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
