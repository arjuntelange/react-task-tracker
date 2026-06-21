import "./App.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="main-layout">
        <Sidebar/>
        <Dashboard/>
      </div>
    </>
  );
}

export default App;