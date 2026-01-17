import React from "react";
import TasksManager from "./components/TasksManager";
import FocusTimer from "./components/FoucsTime";
import MotivationPanel from "./components/MotivationPanel";
import "./styles/app.css";

const App: React.FC = () => {
  return (
    <>
      <div className="app-container">
        <div className="wrapper">
          <p>Everything works perfectly ⚛️!</p>
        </div>
        <div className="wrapper">
          <TasksManager />
        </div>
        <div className="wrapper">
          <FocusTimer />
        </div>
        <div className="wrapper">
          <MotivationPanel />
        </div>
      </div>

      <div></div>
    </>
  );
};

export default App;
