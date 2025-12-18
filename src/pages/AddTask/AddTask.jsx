import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './AddTask.css';

const AddTask = () => {
    const navigate = useNavigate();
    const { addTask, allProjects } = useAppContext();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        projectId: '',
        status: 'todo'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is modified
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Task description is required';
        }

        if (!formData.projectId) {
            newErrors.projectId = 'Please select a project';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            addTask({
                ...formData,
                projectId: parseInt(formData.projectId)
            });
            navigate(`/project/${formData.projectId}`);
        }
    };

    return (
        <div className="add-task">
            <div className="form-container">
                <div className="form-header">
                    <button
                        className="back-link"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>
                    <h1 className="form-title">
                        <span className="form-icon">✏️</span>
                        Add New Task
                    </h1>
                    <p className="form-subtitle">Create a new task for your project</p>
                </div>

                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Task Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`form-input ${errors.title ? 'error' : ''}`}
                            placeholder="Enter task title"
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Task Description <span className="required">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
                            placeholder="Describe the task..."
                            rows="4"
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="projectId" className="form-label">
                                Select Project <span className="required">*</span>
                            </label>
                            <select
                                id="projectId"
                                name="projectId"
                                value={formData.projectId}
                                onChange={handleChange}
                                className={`form-input form-select ${errors.projectId ? 'error' : ''}`}
                            >
                                <option value="">-- Select a Project --</option>
                                {allProjects.map(project => (
                                    <option key={project.id} value={project.id}>
                                        {project.title}
                                    </option>
                                ))}
                            </select>
                            {errors.projectId && <span className="error-message">{errors.projectId}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="status" className="form-label">
                                Initial Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="form-input form-select"
                            >
                                <option value="todo">📋 To Do</option>
                                <option value="in-progress">⚡ In Progress</option>
                                <option value="done">✅ Done</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <span>+</span>
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
