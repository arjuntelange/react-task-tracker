import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const [lists, setList] = useState([]);

  const [selectedList, setSelectedList] = useState();

  return (
    <>
      <div className="main-layout">
        <Sidebar
          lists={lists}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          setList={setList}
        />
        
        <Dashboard 
          selectedList={selectedList} 
          lists={lists} 
        />
      </div>
    </>
  );
}

export default App;
