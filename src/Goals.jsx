import React, { useEffect, useState } from "react";
import "./Goals.css";

const Goals = () => {
  const [goalName, setGoalName] = useState("");
  const [goals, setGoals] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load goals from localStorage
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals"));
    if (storedGoals) setGoals(storedGoals);
    setLoaded(true);
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("goals", JSON.stringify(goals));
    }
  }, [goals, loaded]);

  const addGoal = () => {
    if (!goalName.trim()) return;
    const newGoal = {
      id: Date.now(),
      name: goalName.trim(),
      count: 0,
      logs: [],
    };
    setGoals([...goals, newGoal]);
    setGoalName("");
  };

  const updateGoal = (id, newName) => {
    setGoals(
      goals.map((g) => (g.id === id ? { ...g, name: newName } : g))
    );
  };

  const incrementGoal = (id) => {
    setGoals(
      goals.map((g) =>
        g.id === id
          ? {
              ...g,
              count: g.count + 1,
              logs: [new Date().toISOString().slice(0, 10), ...g.logs],
            }
          : g
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="goals-container">
      <h2>Goals</h2>
      <div className="goals-green">
        <div className="goal-input">
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addGoal();
            }}
            placeholder="Add a Goal"
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {goals.map((goal) => (
            <div
              key={goal.id}
              style={{
                position: "relative",
                margin: "5px",
                width: "200px",
                minHeight: "200px",
                border: "1px solid #333",
                paddingTop: "2em",
  
               
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Delete button */}
              <button
                onClick={() => deleteGoal(goal.id)}
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

            

            {/* Editable goal name */}
<textarea
  value={goal.name}
  onChange={(e) => updateGoal(goal.id, e.target.value)}
  style={{
    width: "100%",
    flexGrow: 1,
    border: "none",
    backgroundColor: "transparent",
    resize: "none",
    outline: "none",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "16px",

    fontFamily:"Times New Roman, Times, serif"
  }}
/>

{/* Plus button */}
<button
  onClick={() => incrementGoal(goal.id)}
  style={{
    position: "absolute",
    right: "4px",
    top: "35px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    fontSize: "18px",
  }}
>
  ＋
</button>

{/* Horizontal line under textarea + plus button */}
<div
  style={{
    position: "absolute",
    top: "75px", 
    left: "8px",
    width: "90%",
    height: "1px",
    backgroundColor: "#333",
  }}
/>

      
                
              {/* Count display */}
              <div
                style={{
                  fontSize: "14px",
                  color: "#000000ff",
                  marginTop: "5px",
                  marginLeft: "10px",
                  position: "absolute",
                  top: "85px",
                }}
              >
                Completed {goal.count} times
              </div>

              {/* Log display */}
              {goal.logs.length > 0 && (
                <ul
                  style={{
                    fontSize: "14px",
                    color: "#000000ff",
                    marginTop: "5px",
                    paddingLeft: "15px",
                    
                    maxHeight: "100px",
                    overflowY: "auto",
                     marginLeft: "10px",
                     marginRight: "15px",
                      scrollbarWidth: "thin",           
    scrollbarColor: "#000000ff #98ac8d", 
    
                  }}
                >
                  {goal.logs.map((log, index) => (
                    <li key={index}>{log}</li>
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
