import React from 'react';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo, onDelete, onToggle }) => {
    return (
        <li className={`todo-item ${todo.status === 'completed' ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.status === 'completed'}
                onChange={() => onToggle(todo._id)}
            />
            <span className="todo-title">{todo.title}</span>
            <span className="todo-title">{todo.description}</span>
            <div className="todo-actions">
                <Link to={`/edit/${todo._id}`} className="edit-btn">Edit</Link>
                <button onClick={() => onDelete(todo._id)} className="delete-btn">
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TodoItem;