import "./DashboardSidebar.css";
import MiniCalendar from "./MiniCalendar";
import { ChartColumn } from "lucide-react";
import ProgressOverview from "./ProgressOverview";

function DashboardSidebar({ completionRate, totalTasks, completedTasks, pendingTasks }) {
  return (
    <aside className="dashboard-sidebar">
      <MiniCalendar />

      <ProgressOverview
        completionRate={completionRate}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

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
