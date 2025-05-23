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
import Goals from './Goals.jsx';

function MainApp() {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('calendar-notes'));
    if (saved?.notes) {
      setNotes(saved.notes);
    }
  }, []);

  return (
    <Router basename="/MyOrganizer">
      <div className="main-container">
        <SideMenu />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="dashboard">
                  <div className="dashboard-item">
                    <TodoList />
                  </div>
                  <div className="dashboard-item">
                    <WeekList />
                  </div>
                  <div className="dashboard-item">
                    <TodayAppointment notes={notes} />
                  </div>
                </div>
              }
            />
            <Route path="/today" element={<TodoList />} />
            <Route path="/week" element={<WeekList />} />
            <Route path="/general" element={<General />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/goals" element={<Goals />} />
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
