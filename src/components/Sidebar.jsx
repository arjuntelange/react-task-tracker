import React from "react";
import {
  Rocket,
  ListTodo,
  Star,
  Smile,
  Plus,
  User,
  FolderOpen,
  LayoutDashboard,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>
          <Rocket size={28} />
          FlowBoard
        </h2>
        <p>Organize. Prioritize. Achieve.</p>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="active-sidebar-item">
            <ListTodo size={18} />
            All Tasks
          </li>
          <li>
            <Star size={18} />
            Starred
          </li>
        </ul>
      </nav>

      <hr />

      <div className="sidebar-tasks">
        <h3>Tasks</h3>

        <ul>
          <li>
            <Smile size={18} />
            Personal Tasks
          </li>
          <li>
            <Rocket size={18} />
            Tech Journey
          </li>
        </ul>

        <button>
          <Plus size={18} />
          New List
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
