import React, { useState } from 'react';

interface Props {
    addTodo: (title: string) => void;
}

const AddTodo: React.FC<Props> = ({ addTodo }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodo;
