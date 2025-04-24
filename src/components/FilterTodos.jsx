import React from 'react';
import { useTodos } from '../context/TodoContext';

const FilterTodos = () => {
    const { filter, setFilter } = useTodos();

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div className="filter-todos">
            <select
                value={filter}
                onChange={handleFilterChange}
                className="filter-dropdown"
            >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
};

export default FilterTodos;