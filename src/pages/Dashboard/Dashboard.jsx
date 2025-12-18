import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Dashboard.css';

const Dashboard = () => {
    const { projects, loading, searchTerm, setSearchTerm } = useAppContext();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="dashboard">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1 className="dashboard-title">
                        <span className="title-icon">🚀</span>
                        Projects Dashboard
                    </h1>
                    <p className="dashboard-subtitle">
                        Manage your projects and tasks efficiently
                    </p>
                </div>

                <div className="dashboard-actions">
                    <div className="search-container">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        className="add-project-btn"
                        onClick={() => navigate('/add-project')}
                    >
                        <span>+</span>
                        Add Project
                    </button>
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No projects found</h3>
                    <p>Start by creating your first project!</p>
                    <button
                        className="add-project-btn"
                        onClick={() => navigate('/add-project')}
                    >
                        Create Project
                    </button>
                </div>
            ) : (
                <div className="projects-grid">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
