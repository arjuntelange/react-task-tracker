import React, { useEffect, useRef, useState } from "react";
import Notification from "./Notification";
import "./TodoList.css";

function TodoList() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  const [notification, setNotification] = useState({
    title: "",
    message: "",
    type: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const timerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!task.trim()) return;

    const check = tasks.some(
      (elem) => elem.text.toLowerCase() === task.trim().toLowerCase(),
    );
    if (check) {
      showNotification(
        "⚠️ Task Already Exists",
        "Try adding a different task.",
        "error",
      );
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);
    setTask("");

    showNotification(
      "🎉 Task Added",
      "Your task has been added successfully.",
      "success",
    );
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((elem) => elem.id !== taskId));

    showNotification(
      "🗑️ Task Deleted",
      "The task has been removed.",
      "success",
    );
  }

  function toggleTask(currentTask) {
    setTasks(
      tasks.map((elem) => {
        if (elem.id === currentTask.id) {
          return { ...elem, completed: !elem.completed };
        }

        return elem;
      }),
    );

    if (currentTask.completed) {
      showNotification("↩️ Task Reopened", "The task is active again.", "info");
    } else {
      showNotification(
        "✅ Task Completed",
        "Great job! Keep going.",
        "success",
      );
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function handleFilter(filterType) {
    setFilter(filterType);
  }

  function showNotification(title, message, type) {
    setNotification({
      title: title,
      message: message,
      type: type,
    });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setNotification({
        title: "",
        message: "",
        type: "",
      });
    }, 2000);
  }

  function clearCompletedTasks() {
    const checkTask = tasks.some((taskCheck) => taskCheck.completed);

    if (checkTask) {
      setTasks(tasks.filter((currentTask) => !currentTask.completed));

      showNotification(
        "🧹 Tasks Cleared",
        "All completed tasks have been removed.",
        "success",
      );
    } else {
      showNotification(
        "ℹ️ Nothing to Clear",
        "There are no completed tasks to remove.",
        "info",
      );
    }
  }

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (searchQuery.trim()) {
    filteredTasks = filteredTasks.filter((currentTask) =>
      currentTask.text.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  return (
    <div className="container">
      <h1>🚀 FlowBoard</h1>
      <p className="app-subtitle">Organize your tasks and stay focused</p>

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

      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
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
                onChange={() => toggleTask(elem)}
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
        <button className="clear-btn" onClick={clearCompletedTasks}>
          🧹Clear Completed
        </button>

        <span className="tasks-counter">Total Tasks: {tasks.length}</span>
      </div>

      {notification.message && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
}

export default TodoList;
