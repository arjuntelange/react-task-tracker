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

function Sidebar({ lists, selectedList, setSelectedList, setList }) {
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
          <li
            className="active-sidebar-item"
            onClick={() => setSelectedList("all") }
          >
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
          {lists.map((list) => (
            <li
              key={list.id}
              onClick={() => setSelectedList(list.id)}
              className={selectedList === list.id ? "active-sidebar-item" : ""}
            >
              {list.name}
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            const listName = prompt("Enter list name");

            if (!listName.trim()) return;

            setList((prevLists) => [
              ...prevLists,
              {
                id: Date.now(),
                name: listName,
              },
            ]);
          }}
        >
          <Plus size={18} />
          New List
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
