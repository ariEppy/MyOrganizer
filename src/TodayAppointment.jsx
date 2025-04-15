import React from 'react';
import './TodayAppointment.css';

const TodayAppointment = ({ notes }) => {
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const appointment = notes[todayKey];

  return (
    <div className="today-appointment-box">
      <h3>Today’s Appointments</h3>
      <p>{appointment ? appointment : 'No appointments'}</p>
    </div>
  );
};

export default TodayAppointment;
