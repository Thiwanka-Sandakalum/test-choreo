import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import initializeDB from './db';
import todoRoutes from './routes';

const app = express();
const PORT = 5000;

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

(async () => {
    const db = await initializeDB();

    app.use('/api/todos', todoRoutes(db));

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})();
