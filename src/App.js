import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
      setError("⚠️ Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setError("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const clearAll = () => {
    setTasks([]);
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="todo-container">
      <h2>✨ Smart To-Do App</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="What’s your next task?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>➕</button>
      </div>

      {error && <p className="error">{error}</p>}

      <p className="counter">
        Pending Tasks: <strong>{pendingCount}</strong>
      </p>

      <ul>
        {tasks.map((t) => (
          <li key={t.id} className={t.completed ? "done" : ""}>
            <span onClick={() => toggleTask(t.id)}>{t.text}</span>
            <button className="delete" onClick={() => deleteTask(t.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <button className="clear" onClick={clearAll}>
          Clear All
        </button>
      )}

      {tasks.length === 0 && (
        <p className="empty">No tasks yet. Add one 🚀</p>
      )}
    </div>
  );
}

export default App;












