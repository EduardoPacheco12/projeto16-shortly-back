import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()

const server = express();
server.use(json());
server.use(cors());

server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
})