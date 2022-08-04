import connection from "../dbs/postgres.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
    const userId = res.locals.userId;
    const body = req.body;
    try {
        const shortUrl = nanoid();
        await connection.query('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)',[body.url, shortUrl, userId]);
        res.status(201).send({
            shortUrl
        });
    } catch (error) {
        res.status(500).send(error);
    }
}