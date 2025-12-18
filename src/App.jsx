import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectTasks from './pages/ProjectTasks/ProjectTasks';
import AddTask from './pages/AddTask/AddTask';
import AddProject from './pages/AddProject/AddProject';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/project/:id" element={<ProjectTasks />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/add-project" element={<AddProject />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
