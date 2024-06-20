import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface Props {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            ))}
        </ul>
    );
};

export default TodoList;
