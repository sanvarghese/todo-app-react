import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import { useTodos } from '../context/TodoContext';
import { getTodo } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EditTodoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { editTodo } = useTodos();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const todoData = await getTodo(id);
                console.log('Received todo data:', todoData); // Debug log

                if (!todoData) {
                    throw new Error('Todo not found');
                }

                setTodo(todoData);
                setError(null);
            } catch (err) {
                console.error('Error fetching todo:', err); // Debug log
                setError(err.message || 'Failed to load todo');
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, [id]);

    const handleSubmit = async (updatedTodo) => {
        try {
            const success = await editTodo(id, updatedTodo);
            if (success) {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Failed to update todo');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="edit-todo-page">
            <h1>Edit Todo</h1>
            {todo ? (
                <TodoForm
                    initialTodo={todo}
                    onSubmit={handleSubmit}
                    buttonText="Update Todo"
                />
            ) : (
                <ErrorMessage message="Todo not found" />
            )}
        </div>
    );
};

export default EditTodoPage;