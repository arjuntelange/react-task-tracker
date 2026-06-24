import React, { useEffect, useRef, useState } from "react";
import Notification from "./Notification";
import { Rocket, Star } from "lucide-react";
import "./TodoList.css";

function TodoList({ lists, selectedList }) {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [priority, setPriority] = useState("Medium");

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
        priority: priority,
        listId: selectedList,
        starred: false,
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

  function toggleStar(currentTask) {
    setTasks(
      tasks.map((elem) => {
        if (elem.id === currentTask.id) {
          return { ...elem, starred: !elem.starred };
        }

        return elem;
      }),
    );
  }

  let filteredTasks = tasks;

  if (selectedList === "starred") {
    filteredTasks = filteredTasks.filter(
      (currentTask) => currentTask.starred === true,
    );
  } else if (selectedList !== "all") {
    filteredTasks = filteredTasks.filter(
      (currentTask) => currentTask.listId === selectedList,
    );
  }

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

  let emptyMessage = "🎉 No tasks yet. Add your first task to get started!";

  if (searchQuery.trim() && filteredTasks.length === 0) {
    emptyMessage = "🔍 No tasks match your search.";
  }

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="container">
      <div className="container-header">
        <h2>
          <Rocket size={28} />
          FlowBoard
        </h2>
        <p>Organize. Prioritize. Achieve.</p>
      </div>

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
      </div>

      <div className="task-controls">
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>

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
          <li className="empty-message">{emptyMessage}</li>
        ) : (
          filteredTasks.map((elem) => (
            <li key={elem.id}>
              <input
                type="checkbox"
                checked={elem.completed}
                onChange={() => toggleTask(elem)}
              />

              <button
                className={`star-btn ${elem.starred ? "starred" : ""}`}
                onClick={() => toggleStar(elem)}
              >
                <Star size={18} fill={elem.starred ? "currentColor" : "none"} />
              </button>

              <span className={elem.completed ? "completed-task" : ""}>
                {elem.text}
              </span>

              <span
                className={`priority-badge priority-${elem.priority.toLowerCase()}`}
              >
                {elem.priority}
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

      <div className="stats-box">
        <span>📋 Total: {tasks.length}</span>

        <span>✅ Completed: {completedTasks}</span>

        <span>⏳ Pending: {pendingTasks}</span>
      </div>

      <div className="counter-box">
        <button className="clear-btn" onClick={clearCompletedTasks}>
          🧹Clear Completed
        </button>
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
