import { createPool } from 'mysql2/promise'
import { APP_DB_USER, APP_DB_USER_PASSWORD, DATABASE_HOSTNAME, DATABASE_NAME, DATABASE_PORT } from './config';

export const pool = createPool({
    host: DATABASE_HOSTNAME,
    user: APP_DB_USER,
    password: APP_DB_USER_PASSWORD,
    database: DATABASE_NAME,
    port: DATABASE_PORT,
});