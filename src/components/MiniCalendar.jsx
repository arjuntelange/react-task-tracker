import "./MiniCalendar.css";
import { CalendarDays } from "lucide-react";

function MiniCalendar() {
  const today = new Date();

  const month = today.toLocaleString("default", {
    month: "long",
  });

  const year = today.getFullYear();

  const currentDate = today.getDate();

  const firstDay = new Date(year, today.getMonth(), 1).getDay();

  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="calendar-card">
      <h3>
        <CalendarDays size={20} />
        {month} {year}
      </h3>

      <div className="calendar-weekdays">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day === currentDate ? "today" : ""}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;
