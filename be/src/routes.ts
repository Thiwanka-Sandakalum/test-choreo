import { Router } from 'express';
import { Database } from 'sqlite';

const todoRoutes = (db: Database) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const todos = await db.all('SELECT * FROM todos');
        res.json(todos);
    });

    router.post('/', async (req, res) => {
        const { title } = req.body;
        await db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, false]);
        res.status(201).send();
    });

    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { completed } = req.body;
        await db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]);
        res.status(204).send();
    });

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        await db.run('DELETE FROM todos WHERE id = ?', [id]);
        res.status(204).send();
    });

    return router;
};

export default todoRoutes;
