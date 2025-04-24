import React from 'react';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import { useTodos } from '../context/TodoContext';

const AddTodoPage = () => {
    const navigate = useNavigate();
    const { createTodo } = useTodos();

    const handleSubmit = async (todo) => {
        const success = await createTodo(todo);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="add-todo-page">
            <h1>Add New Todo</h1>
            <TodoForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddTodoPage;