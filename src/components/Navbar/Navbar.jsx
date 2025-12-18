import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Navbar.css';

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useAppContext();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">📋</span>
                    <span className="brand-text">TaskFlow</span>
                </Link>

                <div className="navbar-links">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    >
                        <span className="nav-icon">🏠</span>
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/add-project"
                        className={`nav-link ${isActive('/add-project') ? 'active' : ''}`}
                    >
                        <span className="nav-icon">📁</span>
                        <span>Add Project</span>
                    </Link>
                    <Link
                        to="/add-task"
                        className={`nav-link ${isActive('/add-task') ? 'active' : ''}`}
                    >
                        <span className="nav-icon">✏️</span>
                        <span>Add Task</span>
                    </Link>
                </div>

                <button
                    className="dark-mode-toggle"
                    onClick={toggleDarkMode}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
