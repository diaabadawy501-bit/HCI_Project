import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './AddProject.css';

const AddProject = () => {
    const navigate = useNavigate();
    const { addProject } = useAppContext();

    const [formData, setFormData] = useState({
        title: '',
        description: ''
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
            newErrors.title = 'Project title is required';
        } else if (formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Project description is required';
        } else if (formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            addProject(formData);
            navigate('/');
        }
    };

    return (
        <div className="add-project">
            <div className="form-container">
                <div className="form-header">
                    <button
                        className="back-link"
                        onClick={() => navigate('/')}
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="form-title">
                        <span className="form-icon">📁</span>
                        Create New Project
                    </h1>
                    <p className="form-subtitle">Add a new project to organize your tasks</p>
                </div>

                <form onSubmit={handleSubmit} className="project-form">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Project Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`form-input ${errors.title ? 'error' : ''}`}
                            placeholder="Enter project title"
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Project Description <span className="required">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
                            placeholder="Describe your project..."
                            rows="5"
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <span>+</span>
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
