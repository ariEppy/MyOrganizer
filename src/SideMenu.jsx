// src/components/SideMenu.jsx
import React from 'react';
import './SideMenu.css';


import { Link, useLocation } from 'react-router-dom';

const SideMenu = () => {
  const location = useLocation();

  return (
    <div className="side-menu">
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/calendar' ? 'active' : ''}>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li className={location.pathname === '/general' ? 'active' : ''}>
          <Link to="/general">Notes</Link>
        </li>
        <li className={location.pathname === '/goals' ? 'active' : ''}>
          <Link to="/goals">Goals</Link>
        </li>
        {/* Add more as needed */}
      </ul>
    </div>
  );
};



export default SideMenu;
