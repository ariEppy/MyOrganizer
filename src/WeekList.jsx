import React, { useState, useEffect } from 'react';
import './WeekList.css';

const WeekList = () => {
  const [weekTask, setWeekTask] = useState('');
  const [weekTasks, setWeekTasks] = useState([]);
  const [weekDoneTasks, setWeekDoneTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('do');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("week-todo-data"));
    if (stored) {
      setWeekTasks(stored.weekTasks || []);
      setWeekDoneTasks(stored.weekDoneTasks || []);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "week-todo-data",
        JSON.stringify({ weekTasks, weekDoneTasks })
      );
    }
  }, [weekTasks, weekDoneTasks, loaded]);

  const addWeekTask = () => {
    if (weekTask.trim()) {
      setWeekTasks([...weekTasks, { id: Date.now(), text: weekTask, completed: false }]);
      setWeekTask('');
    }
  };

  const handleCheckboxChange = (taskId) => {
    setWeekTasks(
      weekTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );

    setTimeout(() => {
      const completedTask = weekTasks.find((task) => task.id === taskId);
      if (completedTask) {
        setWeekDoneTasks([...weekDoneTasks, completedTask]);
        setWeekTasks(weekTasks.filter((task) => task.id !== taskId));
      }
    }, 1000);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const deleteWeekTask = (taskId) => {
    setWeekTasks(weekTasks.filter((task) => task.id !== taskId));
  };

  const clearWeekTasks = () => {
    setWeekDoneTasks([]);
  };

  return (
    <div className="todo-container">
      <h2>This Week</h2>
      <div className='inner'>
        <div className="tab-header">
         
          <button
  className={`do-tab ${activeTab === 'do' ? 'active-tab' : 'inactive-tab'}`}
  onClick={() => setActiveTab('do')}
>
  To Do
</button>
<button
  className={`done-tab ${activeTab === 'done' ? 'active-tab' : 'inactive-tab'}`}
  onClick={() => setActiveTab('done')}
>
  Done
</button>

        </div>

        {activeTab === "do" && (
          <>
            <div className="task-list">
              <ul>
                {weekTasks.map((task) => (
                  <li key={task.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer", flex: 1 }}>
                      <input
                        id={`task-${task.id}`}
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleCheckboxChange(task.id)}
                        style={{ marginRight: "10px" }}
                      />
                      <span htmlFor={`task-${task.id}`}>{task.text}</span>
                    </label>
                    <button
                      onClick={() => deleteWeekTask(task.id)}
                      style={{
                        marginLeft: "10px",
                        background: "transparent",
                        border: "none",
                        color: "#000",
                        cursor: "pointer",
                      }}
                      aria-label="Delete task"
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
                value={weekTask}
                onChange={(e) => setWeekTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addWeekTask();
                  }
                }}
                placeholder="Add task"
              />
            </div>
          </>
        )}

        {activeTab === "done" && (
          <div className="done-list">
            <ul>
              {weekDoneTasks.map((task) => (
                <li key={task.id} style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "8px", color: "black" }}>✓</span>
                  <span>
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
            <button onClick={clearWeekTasks} className="clear-button">
              clear tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeekList;
