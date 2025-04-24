import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddTodoPage from './pages/AddTodoPage';
import EditTodoPage from './pages/EditTodoPage';
import { TodoProvider } from './context/TodoContext';
import './App.css';

const App = () => {
  return (
    <TodoProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTodoPage />} />
            <Route path="/edit/:id" element={<EditTodoPage />} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
};

export default App;