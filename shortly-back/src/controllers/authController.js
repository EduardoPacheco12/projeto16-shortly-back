import connection from "../dbs/postgres.js";

export async function SignUp(req, res) {
    const body = req.body;
    try {
        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',[body.name, body.email, body.password]);
        res.sendStatus(201);
    } catch (error) {
       res.status(500).send(error); 
    }
   
}

export async function SignIn(req, res) {

}