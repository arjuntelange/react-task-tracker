import React from "react";
import TodoList from "./TodoList";

function Dashboard({lists, selectedList}) {
  return (
    <main className="dashboard">
      <TodoList 
        selectedList={selectedList} 
        lists={lists} 
      />
    </main>
  );
}

export default Dashboard;
