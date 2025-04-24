import React from 'react';
import TodoItem from './TodoItem';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { useTodos } from '../context/TodoContext';

const TodoList = () => {
    const { todos = [], loading, error, removeTodo, toggleTodoStatus } = useTodos();

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="todo-list">
            {todos.length === 0 ? (
                <p>No todos found. Add a new todo to get started!</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <TodoItem
                            key={todo._id}  // Use _id instead of id
                            todo={todo}
                            onDelete={removeTodo}
                            onToggle={toggleTodoStatus}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;