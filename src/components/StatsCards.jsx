import "./StatsCards.css";
import {
  ClipboardList,
  CheckCircle,
  Clock3,
  Flame,
} from "lucide-react";

function StatsCards({
  totalTasks,
  completedTasks,
  pendingTasks,
  highPriorityTasks,
}) {
  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      subtitle: "All your tasks",
      icon: <ClipboardList size={22} />,
      className: "total-card",
    },
    {
      title: "Completed",
      value: completedTasks,
      subtitle: "Great progress",
      icon: <CheckCircle size={22} />,
      className: "completed-card",
    },
    {
      title: "Pending",
      value: pendingTasks,
      subtitle: "Keep going",
      icon: <Clock3 size={22} />,
      className: "pending-card",
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      subtitle: "Needs attention",
      icon: <Flame size={22} />,
      className: "priority-card",
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.title} className={`stat-card ${stat.className}`}>
          <div className="stat-top">
            <div className="icon-box">
              {stat.icon}
            </div>

            <div>
              <h4>{stat.title}</h4>
              <span>{stat.subtitle}</span>
            </div>
          </div>

          <h2>{stat.value}</h2>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;