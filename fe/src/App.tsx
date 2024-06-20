import React, { useEffect, useState } from 'react';
import './App.css';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = process.env.API_URL || "http://localhost:8080/api";
console.log(API_URL)

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    console.log('Fetching todos from:', `${API_URL}/todos`);
    axios.get(`${API_URL}/todos`).then(response => {
      console.log('Received todos:', response.data);
      setTodos(response.data);
    }).catch(error => {
      console.error('Error fetching todos:', error);
    });
  }, []);

  const addTodo = (title: string) => {
    console.log('Adding todo:', title);
    axios.post(`${API_URL}/todos`, { title }).then(() => {
      console.log('Todo added successfully');
      setTodos([...todos, { id: Date.now(), title, completed: false }]);
    }).catch(error => {
      console.error('Error adding todo:', error);
    });
  };

  const toggleTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      console.log('Toggling todo:', id);
      axios.put(`${API_URL}/todos/${id}`, { completed: !todo.completed }).then(() => {
        console.log('Todo toggled successfully');
        setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
      }).catch(error => {
        console.error('Error toggling todo:', error);
      });
    }
  };

  const deleteTodo = (id: number) => {
    console.log('Deleting todo:', id);
    axios.delete(`${API_URL}/todos/${id}`).then(() => {
      console.log('Todo deleted successfully');
      setTodos(todos.filter(t => t.id !== id));
    }).catch(error => {
      console.error('Error deleting todo:', error);
    });
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
