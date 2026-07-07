import React, { useEffect, useRef, useState } from "react";
import { Rocket, Star } from "lucide-react";
import heroBg from "../assets/hero-bg-img.png";

import Notification from "./Notification";
import StatsCards from "./StatsCards";
import InputSection from "./InputSection";
import TasksBoard from "./TasksBoard";
import "./TodoList.css";
import DashboardSidebar from "./DashboardSidebar";

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

    if (selectedList === "all" || selectedList === "starred") {
      showNotification(
        "📂 Select a List",
        "Please choose a task list before adding tasks.",
        "info",
      );

      return;
    }

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
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
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

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.length - completedTasks;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High",
  ).length;

  return (
    <div className="container">
      <div className="hero-banner">
        <img src={heroBg} alt="Hero Banner" />

        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Good Morning, Arjun 👋</h1>

            <p>Focus on today, create your future.</p>
          </div>

          <div className="hero-search">
            <input
              type="text"
              placeholder=" Search tasks... 🔍"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="main-content">
          <StatsCards
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
            highPriorityTasks={highPriorityTasks}
          />

          <InputSection
            task={task}
            setTask={setTask}
            priority={priority}
            setPriority={setPriority}
            onAddTask={addTask}
            onHandleKeyDown={handleKeyDown}
          />

          <TasksBoard
            filter={filter}
            filteredTasks={filteredTasks}
            emptyMessage={emptyMessage}
            toggleTask={toggleTask}
            toggleStar={toggleStar}
            deleteTask={deleteTask}
            handleFilter={handleFilter}
            clearCompletedTasks={clearCompletedTasks}
          />
        </div>

        <DashboardSidebar />
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
