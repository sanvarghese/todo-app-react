import React, { useState } from 'react';

const TodoForm = ({ initialTodo = {}, onSubmit, buttonText = 'Add Todo' }) => {
    const [todo, setTodo] = useState({
        title: initialTodo.title || '',
        description: initialTodo.description || '',
        completed: initialTodo.status === 'complete' ? true : false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTodo({
            ...todo,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!todo.title.trim()) newErrors.title = 'Title is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        onSubmit(todo);
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
                <label>Title*</label>
                <input
                    type="text"
                    name="title"
                    value={todo.title}
                    onChange={handleChange}
                    className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    value={todo.description}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="completed"
                        checked={todo.completed}
                        onChange={handleChange}
                    />
                    Completed
                </label>
            </div>
            <button type="submit" className="submit-btn">
                {buttonText}
            </button>
        </form>
    );
};

export default TodoForm;