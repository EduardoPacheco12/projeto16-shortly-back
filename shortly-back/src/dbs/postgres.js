import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const database = process.env.DATABASE_NAME;

const connection = new Pool({
    user,
    password,
    host,
    port,
    database
});

export default connection;