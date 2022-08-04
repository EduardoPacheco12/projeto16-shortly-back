import { signInSchema, signUpSchema } from "../schemas/authSchema.js";
import connection from "../dbs/postgres.js";
import bcrypt from "bcrypt";

export async function SignUpMiddleware(req, res, next) {
    const body = req.body;

    const { error } = signUpSchema.validate(body, { abortEarly: false });
    if(error) {
        return res.status(422).send(error.details);
    }

    const { rows: verifyEmail } = await connection.query('SELECT * FROM users WHERE email = $1',[body.email]);
    if(verifyEmail[0]) {
        return res.sendStatus(409);
    }

    next();
}

export async function SignInMiddleware(req, res, next) {
    const body = req.body;

    const { error } = signInSchema.validate(body, { abortEarly: false });
    if (error) {
        return res.status(422).send(error.details);
    }

    const { rows: verifyUser } = await connection.query('SELECT * FROM users WHERE email = $1', [body.email]);
    const verifyPassword = bcrypt.compareSync(body.password, verifyUser[0].password);
    if(!verifyUser[0] || !verifyPassword) {
        return res.sendStatus(401);
    }

    res.locals.id = verifyUser[0].id

    next();
}