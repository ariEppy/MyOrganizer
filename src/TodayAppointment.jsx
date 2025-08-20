import React, { useState, useEffect } from "react";
import "./TodayAppointment.css";

const TodayAppointment = () => {
  const [today, setToday] = useState(new Date());
  const [notes, setNotes] = useState({});

  // Load notes from localStorage when component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("calendar-notes"));
    if (saved?.notes) {
      setNotes(saved.notes);
    }
  }, []);

  // Listen for changes in localStorage (e.g., if notes are updated in Calendar)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = JSON.parse(localStorage.getItem("calendar-notes"));
      if (saved?.notes) {
        setNotes(saved.notes);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Auto-update "today" at midnight
  useEffect(() => {
    const updateToday = () => setToday(new Date());

    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timeoutId = setTimeout(() => {
      updateToday();
      const intervalId = setInterval(updateToday, 24 * 60 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, []);

  // Format today's key (YYYY-MM-DD)
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;

  const appointment = notes[todayKey];

  return (
    <div className="today-appointment-box">
      <h3>Today’s Appointments</h3>
      <p>{appointment ? appointment : "No appointments"}</p>
    </div>
  );
};

export default TodayAppointment;
