import React from "react";
import { useState } from "react";
import "./TasksBoard.css";
import { Star, MoreVertical, Trash2 } from "lucide-react";

function TasksBoard({
  filter,
  filteredTasks,
  emptyMessage,
  toggleTask,
  toggleStar,
  deleteTask,
  handleFilter,
  clearCompletedTasks,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <section className="tasks-container">
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

      <hr />

      <ul>
        {filteredTasks.length === 0 ? (
          <p className="empty-message">{emptyMessage}</p>
        ) : (
          filteredTasks.map((elem) => (
            <li key={elem.id}>
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={elem.completed}
                  onChange={() => toggleTask(elem)}
                />

                <button
                  className={`star-btn ${elem.starred ? "starred" : ""}`}
                  onClick={() => toggleStar(elem)}
                >
                  <Star
                    size={18}
                    fill={elem.starred ? "currentColor" : "none"}
                  />
                </button>

                <span className={`task-text ${elem.completed ? "completed-task" : ""}`}>
                  {elem.text}
                </span>
              </div>

              <div className="task-right">
                <span
                  className={`priority-badge priority-${elem.priority.toLowerCase()}`}
                >
                  {elem.priority}
                </span>

                <div className="task-menu">
                  <button
                    className="menu-btn"
                    onClick={() =>
                      setOpenMenu(openMenu === elem.id ? null : elem.id)
                    }
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenu === elem.id && (
                    <div className="menu-dropdown">
                      <button>Edit</button>

                      <button>Duplicate</button>

                      <button onClick={() => deleteTask(elem.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="counter-box">
        <button className="clear-btn" onClick={clearCompletedTasks}>
          🧹Clear Completed
        </button>
      </div>
    </section>
  );
}

export default TasksBoard;
