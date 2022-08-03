import { signUpŚchema } from "../schemas/authSchema.js";
import connection from "../dbs/postgres.js";

export async function SignUpMiddleware(req, res, next) {
    const body = req.body;

    const { error } = signUpŚchema.validate(body, { abortEarly: false });
    if(error) {
        return res.status(422).send(error.details);
    }

    const { rows: verifyEmail } = await connection.query('SELECT * FROM users WHERE email = $1',[body.email]);
    if(verifyEmail[0]) {
        return res.sendStatus(409);
    }

    next();
}
