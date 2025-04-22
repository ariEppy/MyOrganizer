import React, { useEffect, useState } from 'react';
import './Goals.css'; // Create or update this file like your other pages

const Goals = () => {
  const [goalName, setGoalName] = useState('');
  const [goals, setGoals] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [expandedGoals, setExpandedGoals] = useState({});


  // Load goals from localStorage
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals"));
    if (storedGoals) {
      setGoals(storedGoals);
    }
    setLoaded(true);
  }, []);

  // Save goals to localStorage on change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("goals", JSON.stringify(goals));
    }
  }, [goals, loaded]);

  const addGoal = () => {
    const newGoal = {
      name: goalName.trim(),
      count: 0,
      logs: [],
    };
    setGoals([...goals, newGoal]);
  };
  

  const incrementGoal = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].count += 1;
    updatedGoals[index].logs.unshift(new Date().toISOString().slice(0, 10));
    setGoals(updatedGoals);
  };
  const toggleLogVisibility = (index) => {
    setExpandedGoals((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  
    // Also remove its expanded state
    setExpandedGoals((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };
  

  return (
    <div className="goals-container">
      <h2>Goal Tracker</h2>
      <div className="goals-green">
      <div className="goal-input">
      <input
  type="text"
  value={goalName}
  onChange={(e) => setGoalName(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && goalName.trim() !== "") {
      addGoal(); // your goal-adding function
      setGoalName(""); // clear input
    }
  }}
  placeholder="Add Goal"
/>

      
      </div>

      <div className="goal-list">
        {goals.map((goal, index) => (
          <div className="goal-item" key={index}>
          <div className="goal-header">
  <span className="goal-text">
    <strong>{goal.name}</strong> - Completed {goal.count} times
  </span>
  <div className="goal-buttons">
    <button onClick={() => incrementGoal(index)}>+</button>
    <button onClick={() => deleteGoal(index)}> ✕</button>
    <button onClick={() => toggleLogVisibility(index)}>
      {expandedGoals[index] ? "˄" : "˅"}
    </button>
  </div>
</div>


        
          {expandedGoals[index] && (
  <ul className="log-list">
    {goal.logs.map((log, logIndex) => (
      <li key={logIndex}>{log}</li>
    ))}
  </ul>
)}

        </div>
        
        ))}
      </div>
      </div>
    </div>
  );
};

export default Goals;
