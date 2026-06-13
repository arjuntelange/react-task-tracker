import React, { useState } from "react";
import "./TodoList.css"

function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  function addTask() {
    if (!task.trim()) return;
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);
    setTask("");
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((elem) => elem.id !== taskId));
  }

  function toggleTask(taskId) {
    setTasks(
      tasks.map((elem) => {
        if (elem.id === taskId) {
          return { ...elem, completed: !elem.completed };
        }

        return elem;
      }),
    );
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function handleFilter(filterType) {
    setFilter(filterType);
  }

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  return (
    <div className="container">
      <h1>📝 Todo List</h1>

      <div className="input-section">
        <input
          onChange={(event) => {
            setTask(event.target.value);
          }}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter a task"
          value={task}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {filteredTasks.length === 0 ? (
          <li className="empty-message">No tasks found.</li>
        ) : (
          filteredTasks.map((elem) => (
            <li key={elem.id}>
              <input
                type="checkbox"
                checked={elem.completed}
                onChange={() => toggleTask(elem.id)}
              />
              <span className={elem.completed ? "completed-task" : ""}>
                {elem.text}
              </span>
              <button onClick={() => deleteTask(elem.id)}>❌</button>
            </li>
          ))
        )}
      </ul>

      <div className="filter-section">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => handleFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => handleFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => handleFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="counter-box">
        <span className="tasks-counter">Total Tasks: {tasks.length}</span>
      </div>
    </div>
  );
}

export default TodoList;
