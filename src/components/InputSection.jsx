import React from "react";
import { useRef } from "react";
import "./InputSection.css";
import { Plus } from "lucide-react";

function InputSection({
  task,
  priority,
  setTask,
  setPriority,

  onAddTask,
  onHandleKeyDown,
}) {
  return (
    <section className="addtask-section">

      <div className="input-section">
        <input
          onChange={(event) => {
            setTask(event.target.value);
          }}
          onKeyDown={onHandleKeyDown}
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

        <button onClick={onAddTask} className="add-button">
          <Plus size={22} />
          Add Task
        </button>
      </div>
    </section>
  );
}

export default InputSection;
