import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();
    const { getProjectTaskCount } = useAppContext();

    const taskCount = getProjectTaskCount(project.id);

    const handleViewTasks = () => {
        navigate(`/project/${project.id}`);
    };

    return (
        <div className="project-card">
            <div className="project-card-header">
                <div className="project-icon">📁</div>
                <h3 className="project-title">{project.title}</h3>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-card-footer">
                <div className="task-count">
                    <span className="task-count-icon">📝</span>
                    <span className="task-count-text">{taskCount} Tasks</span>
                </div>

                <button
                    className="view-tasks-btn"
                    onClick={handleViewTasks}
                >
                    View Tasks
                    <span className="btn-arrow">→</span>
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
