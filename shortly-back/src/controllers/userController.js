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

export async function getUser(req, res) {
    const userId = res.locals.userId;
    try {
        const { rows: userUrls } = await connection.query(`
            SELECT 
                users.id as id, 
                users.name as name, 
                SUM(view) as "visitCount", 
                json_agg(
                    json_build_object(
                        'id', urls.id,
                        'shortUrl', urls."shortUrl",
                        'url', urls.url,
                        'visitCount', urls.view
                    )
                ) as "shortenedUrls"
            FROM urls
            JOIN users
            ON urls."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id
        `, [userId]);
        res.status(200).send(userUrls);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getRankings(req, res) {
    try {
        const { rows: rankings } = await connection.query(`
            SELECT users.id as id, users.name as name, COUNT(urls) as "linksCount", COALESCE(SUM(view), 0) as "visitCount"
            FROM users
            LEFT JOIN urls
            ON users.id = urls."userId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10
        `);
        res.status(200).send(rankings);
    } catch (error) {
        res.status(500).send(error);
    }
}