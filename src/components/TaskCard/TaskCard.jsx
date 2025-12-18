import React from 'react';
import { useAppContext } from '../../context/AppContext';
import './TaskCard.css';

const TaskCard = ({ task }) => {
    const { updateTaskStatus, deleteTask } = useAppContext();

    const handleMoveLeft = () => {
        if (task.status === 'in-progress') {
            updateTaskStatus(task.id, 'todo');
        } else if (task.status === 'done') {
            updateTaskStatus(task.id, 'in-progress');
        }
    };

    const handleMoveRight = () => {
        if (task.status === 'todo') {
            updateTaskStatus(task.id, 'in-progress');
        } else if (task.status === 'in-progress') {
            updateTaskStatus(task.id, 'done');
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Deleting task:', task.id);
        deleteTask(task.id);
    };

    const canMoveLeft = task.status !== 'todo';
    const canMoveRight = task.status !== 'done';

    return (
        <div className={`task-card task-card-${task.status}`}>
            <div className="task-card-content">
                <h4 className="task-title">{task.title}</h4>
                <p className="task-description">{task.description}</p>
            </div>

            <div className="task-card-actions">
                <div className="move-actions">
                    <button
                        className={`action-btn move-btn ${!canMoveLeft ? 'disabled' : ''}`}
                        onClick={handleMoveLeft}
                        disabled={!canMoveLeft}
                        title="Move Left"
                    >
                        ←
                    </button>
                    <button
                        className={`action-btn move-btn ${!canMoveRight ? 'disabled' : ''}`}
                        onClick={handleMoveRight}
                        disabled={!canMoveRight}
                        title="Move Right"
                    >
                        →
                    </button>
                </div>
                <button
                    className="action-btn delete-btn"
                    onClick={handleDelete}
                    title="Delete Task"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
