import "reflect-metadata";
import express from "express";
import { db } from "./datasource";
import router from "./routes";
import cors from "cors";

async function startServer() {
    
    const PORT = 5000;

    const server = express();

    await db.initialize();

    server.use(cors());

    server.use(express.json());

    server.use(router);
    
    server.listen(PORT, () => console.info(`Server started at : http://localhost:${PORT}`));
}

void startServer();