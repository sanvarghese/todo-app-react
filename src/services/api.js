import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const getTodos = async () => {
    // const response = await axios.get(API_URL);
    // return response.data.response; 

    try {
        const response = await axios.get(API_URL);
        if (!response.data?.data?.response) {
            throw new Error('Invalid response structure');
        }
        return response.data.data.response;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};



export const getTodo = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Return the direct todo object
};

export const addTodo = async (todo) => {
    const response = await axios.post(API_URL, todo);
    return response.data; // Assuming this returns the new todo object
};

export const updateTodo = async (id, todo) => {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    return response.data; // Assuming this returns the updated todo object
};

export const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};