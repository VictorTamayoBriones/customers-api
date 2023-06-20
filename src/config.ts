import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_HOSTNAME = process.env.DATABASE_HOSTNAME || 'localhost';
export const APP_DB_USER = process.env.APP_DB_USER || 'root';
export const APP_DB_USER_PASSWORD = process.env.APP_DB_USER_PASSWORD || '1233';
export const DATABASE_NAME = process.env.DATABASE_NAME || 'companydb';
export const DATABASE_PORT = Number(process.env.DATABASE_PORT) || undefined;