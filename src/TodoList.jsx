import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('do');
  const [loaded, setLoaded] = useState(false); 
  
 // Load tasks from localStorage on mount
 useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("todo-data"));
  if (stored) {
    setTasks(stored.tasks || []);
    setDoneTasks(stored.doneTasks || []);
  }
  setLoaded(true);
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
        const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
        const matchingIndex = storedGoals.findIndex(
          (goal) => goal.name.toLowerCase() === completedTask.text.toLowerCase()
        );
        if (matchingIndex !== -1) {
          storedGoals[matchingIndex].count += 1;
          storedGoals[matchingIndex].logs.unshift(new Date().toISOString().slice(0, 10));
          localStorage.setItem("goals", JSON.stringify(storedGoals));
        }
  
        setDoneTasks([...doneTasks, completedTask]);
        setTasks(tasks.filter((task) => task.id !== taskId));
      }
    }, 1000);
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
    <li key={task.id} >
    <label >
  <input
    id={`task-${task.id}`}
    type="checkbox"
    checked={task.completed}
    onChange={() => handleCheckboxChange(task.id)}
    
  />
  <span>{task.text}</span>
</label>

      <button
        onClick={() => deleteTask(task.id)}
       
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
        <li key={task.id} >
          <span >✓</span>
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
