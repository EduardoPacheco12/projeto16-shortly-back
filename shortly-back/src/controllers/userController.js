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

export async function getUrlId(req, res) {
    const { id, url, shortUrl} = res.locals.url;
    try {
        const urlData = {
            id,
            url,
            shortUrl
        }
        res.status(200).send(urlData);
    } catch (error) {
        res.status(500).send(error);
    }
    
}

export async function redirectUrl(req, res) {
    const body = res.locals.body;

    try {
        await connection.query('UPDATE urls SET view = $1 WHERE "shortUrl" = $2',[body.view + 1, body.shortUrl]);
        res.redirect(body.url);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;

    try {
        await connection.query('DELETE FROM urls WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error);
    }
}