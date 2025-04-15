import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('do');
  const [loaded, setLoaded] = useState(false); // NEW
  
 // Load tasks from localStorage on mount
 useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("todo-data"));
  if (stored) {
    setTasks(stored.tasks || []);
    setDoneTasks(stored.doneTasks || []);
  }
  setLoaded(true); // ✅ Mark that we've loaded
}, []);


// Save tasks to localStorage when changed

useEffect(() => {
  if (loaded) {
    localStorage.setItem(
      "todo-data",
      JSON.stringify({ tasks, doneTasks })
    );
  }
}, [tasks, doneTasks, loaded]);




  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleCheckboxChange = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );

    setTimeout(() => {
      const completedTask = tasks.find((task) => task.id === taskId);
      if (completedTask) {
        setDoneTasks([...doneTasks, completedTask]);
        setTasks(tasks.filter((task) => task.id !== taskId));
      }
    }, 1000);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  const deleteTasks = () => {
    setDoneTasks([]);
  };
  

  return (
    <div className="todo-container">
      <h2>Today's List</h2>
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
  {tasks.map((task) => (
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
        onClick={() => deleteTask(task.id)}
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
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
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
      {doneTasks.map((task) => (
        <li key={task.id} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "8px", color: "black" }}>✓</span>
          <span>
            {task.text}
          </span>
        </li>
      ))}
    </ul>
    <button onClick={() => deleteTasks()} className="clear-button">
      clear tasks
    </button>
  </div>
)}

    </div>
    </div>
  );
};

export default TodoList;
