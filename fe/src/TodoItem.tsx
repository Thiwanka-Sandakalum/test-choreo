import React from 'react';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface Props {
    todo: Todo;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <li>
            <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => toggleTodo(todo.id)}
            >
                {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;
