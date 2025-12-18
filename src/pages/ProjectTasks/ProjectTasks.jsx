import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import TaskCard from '../../components/TaskCard/TaskCard';
import './ProjectTasks.css';

const ProjectTasks = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { allProjects, getProjectTasks, loading } = useAppContext();

    const project = allProjects.find(p => p.id === parseInt(id));
    const tasks = getProjectTasks(id);

    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
    const doneTasks = tasks.filter(task => task.status === 'done');

    if (loading) {
        return (
            <div className="project-tasks">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading tasks...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-tasks">
                <div className="error-state">
                    <div className="error-icon">❌</div>
                    <h3>Project not found</h3>
                    <p>The project you're looking for doesn't exist.</p>
                    <button
                        className="back-btn"
                        onClick={() => navigate('/')}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="project-tasks">
            <div className="project-header">
                <button
                    className="back-link"
                    onClick={() => navigate('/')}
                >
                    ← Back to Dashboard
                </button>

                <div className="project-info">
                    <h1 className="project-title">
                        <span className="project-icon">📁</span>
                        {project.title}
                    </h1>
                    <p className="project-description">{project.description}</p>
                </div>

                <button
                    className="add-task-btn"
                    onClick={() => navigate('/add-task')}
                >
                    <span>+</span>
                    Add Task
                </button>
            </div>

            <div className="task-columns">
                {/* To Do Column */}
                <div className="task-column">
                    <div className="column-header column-todo">
                        <span className="column-icon">📋</span>
                        <h3>To Do</h3>
                        <span className="task-count">{todoTasks.length}</span>
                    </div>
                    <div className="column-content">
                        {todoTasks.length === 0 ? (
                            <div className="column-empty">No tasks</div>
                        ) : (
                            todoTasks.map(task => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="task-column">
                    <div className="column-header column-progress">
                        <span className="column-icon">⚡</span>
                        <h3>In Progress</h3>
                        <span className="task-count">{inProgressTasks.length}</span>
                    </div>
                    <div className="column-content">
                        {inProgressTasks.length === 0 ? (
                            <div className="column-empty">No tasks</div>
                        ) : (
                            inProgressTasks.map(task => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </div>

                {/* Done Column */}
                <div className="task-column">
                    <div className="column-header column-done">
                        <span className="column-icon">✅</span>
                        <h3>Done</h3>
                        <span className="task-count">{doneTasks.length}</span>
                    </div>
                    <div className="column-content">
                        {doneTasks.length === 0 ? (
                            <div className="column-empty">No tasks</div>
                        ) : (
                            doneTasks.map(task => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTasks;
