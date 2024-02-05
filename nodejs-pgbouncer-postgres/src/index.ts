import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';

// Create a new express application instance
const app: express.Application = express();
const port = process.env.APP_PORT; // Port the app will listen on

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL pool configuration
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.PGBOUNCER_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.PGBOUNCER_PORT || '6432'),
});

// An async function to query the database
async function queryDatabase(): Promise<any> {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT NOW()');
        return result.rows;
    } finally {
        client.release();
    }
}

// Define a route for the API
app.get('/api/time', async (req, res) => {
    try {
        const queryResult = await queryDatabase();
        res.json(queryResult);
    } catch (error) {
        console.error('Database query error', error);
        res.status(500).send('Error querying the database');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
