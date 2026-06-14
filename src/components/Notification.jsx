import React from "react";
import "./Notification.css";

function Notification({ title, message, type }) {
  return (
    <div className={`toast ${type}`}>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
