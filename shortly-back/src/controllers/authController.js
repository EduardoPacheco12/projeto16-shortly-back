import connection from "../dbs/postgres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function SignUp(req, res) {
    const body = req.body;
    const passwordHash = bcrypt.hashSync(body.password, 10); 
    try {
        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',[body.name, body.email, passwordHash]);
        res.sendStatus(201);
    } catch (error) {
       res.status(500).send(error); 
    }
   
}

export async function SignIn(req, res) {
    const id = res.locals.id;
    try {
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 1800 // expires in 30min
        });
        res.status(200).send(token);
    } catch (error) {
        res.status(500).send(error);
    }
    
}