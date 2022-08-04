import { postUrlSchema } from "../schemas/usersSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connection from "../dbs/postgres.js";
dotenv.config()

export async function tokenValidation(req, res, next) {

    const { authorization } = req.headers;
    if(!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization?.replace('Bearer ', '');
    await jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            return res.sendStatus(401);
        }

        res.locals.userId = decoded.id;
        next();
    });

}

export async function postUrlMiddleware(req, res, next) {
    const body = req.body;
    const { error } = postUrlSchema.validate(body, { abortEarly: false });
    if (error) {
        return res.status(422).send(error.details);
    }

    next();
}

export async function getUrlIdMiddleware(req, res, next) {
    const { id } = req.params;

    const { rows: verifyId } = await connection.query('SELECT * FROM urls WHERE id = $1', [id]);
    if(!verifyId[0]) {
        return res.sendStatus(404);
    }
    res.locals.url = verifyId[0];

    next()
}

export async function getShortUrlMiddleware(req, res, next) {
    const { shortUrl } = req.params;
    
    const { rows: verifyShortUrl } = await connection.query('SELECT * FROM urls WHERE "shortUrl" = $1', [shortUrl]);
    if(!verifyShortUrl[0]) {
        return res.sendStatus(404);
    }

    res.locals.body = verifyShortUrl[0];

    next();
}

export async function deleteUrlUserMiddleware(req, res, next) {
    const { id } = req.params;
    const userId = res.locals.userId;
    
    const { rows: verifyId } = await connection.query('SELECT * FROM urls WHERE id = $1', [id]);
    if(!verifyId[0]) {
        return res.sendStatus(404);
    }

    const { rows: verifyUrlUser } = await connection.query('SELECT * FROM urls WHERE urls.id = $1 AND urls."userId" = $2',[Number(id), userId]);
    if(!verifyUrlUser[0]) {
        return res.sendStatus(401);
    }

    next();
}