import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/api';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
    const [refresh, setRefresh] = useState(false); // New refresh flag

    useEffect(() => {
        fetchTodos();
    }, [refresh]);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const todos = await getTodos();
            setTodos(todos || []); // Ensure we always have an array
            setError(null);
        } catch (err) {
            setError(err.message);
            setTodos([]); // Reset to empty array on error
        } finally {
            setLoading(false);
        }
    };

    const createTodo = async (todo) => {
        setLoading(true);
        try {
            const newTodo = await addTodo(todo);
            setTodos([...todos, newTodo]);
            setError(null);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const editTodo = async (id, updatedTodo) => {
        setLoading(true);
        try {
            const data = await updateTodo(id, updatedTodo);
            setRefresh(prev => !prev); // Toggle refresh flag

            setTodos(todos.map(todo => todo.id === id ? data : todo));
            setError(null);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
            //  filter
        }
    };

    const removeTodo = async (id) => {
        setLoading(true);
        try {
            await deleteTodo(id);
            setRefresh(prev => !prev); // Toggle refresh flag
            setTodos(todos.filter(todo => todo.id !== id));
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleTodoStatus = async (id) => {
        const todo = todos.find(todo => todo._id === id);
        if (todo) {
            await editTodo(id, {
                ...todo,
                status: todo.status === 'pending' ? 'completed' : 'pending'
            });
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'pending') return todo.status === 'pending';
        return true;
    });

    return (
        <TodoContext.Provider
            value={{
                todos: filteredTodos,
                loading,
                error,
                filter,
                setFilter,
                createTodo,
                editTodo,
                removeTodo,
                toggleTodoStatus,
                fetchTodos
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => useContext(TodoContext);