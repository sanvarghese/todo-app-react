import React from 'react';
import { Link } from 'react-router-dom';
// import TodoList from '../components/TodoList';
import FilterTodos from '../components/FilterTodos';
import TodoList from '../components/TodoList';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>My Todo List</h1>
            {/* <FilterTodos /> */}
            <TodoList />
            <Link to="/add" className="add-todo-link">
                Add New Todo
            </Link>
        </div>
    );
};

export default HomePage;