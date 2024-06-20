import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initializeDB = async () => {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    )
  `);

    return db;
};

export default initializeDB;
