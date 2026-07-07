import "./DashboardSidebar.css";
import MiniCalendar from "./MiniCalendar";

function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <MiniCalendar />

      <div className="sidebar-card">
        <h3>📊 Progress</h3>
        <p>42% Completed</p>
      </div>

      <div className="sidebar-card">
        <h3>💬 Quote</h3>
        <p>Small progress is still progress.</p>
      </div>

      <div className="sidebar-card">
        <h3>⚡ Quick Actions</h3>

        <button>Create Task</button>
        <button>Create Project</button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
