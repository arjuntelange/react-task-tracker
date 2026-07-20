import React from "react";
import "./ProgressOverview.css";
import { ChartColumn } from "lucide-react";

function ProgressOverview({
  completionRate,
  totalTasks,
  completedTasks,
  pendingTasks,
}) {
  return (
    <div className="progress-card">
      <h3>
        <ChartColumn size={20} />
        Progress
      </h3>

      {totalTasks === 0 ? (
        <p className="empty-progress">
          Add your first task to start tracking progress 🎯
        </p>
      ) : (
        <>
          <div className="progress-percentage">{completionRate}%</div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${completionRate}%`,
              }}
            ></div>
          </div>

          <p className="progress-message">
            {completionRate >= 80
              ? "🔥 Amazing progress!"
              : completionRate >= 50
                ? "🚀 Keep the momentum going!"
                : "💪 Every task counts."}
          </p>
          
          <div className="progress-stats">
            <div>
              <strong>{completedTasks}</strong>
              <span>Done</span>
            </div>

            <div>
              <strong>{pendingTasks}</strong>
              <span>Pending</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProgressOverview;
