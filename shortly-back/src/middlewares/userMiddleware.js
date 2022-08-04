import { postUrlSchema } from "../schemas/usersSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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