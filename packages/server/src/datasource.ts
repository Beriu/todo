import { Todo } from "./models/Todo";
import { DataSource } from "typeorm";
import { URL } from "url";

const databaseUrl = process.env.DATABASE_URL;

if(!databaseUrl) throw new Error('Set the DATABASE_URL variable in your env file.');

const dbUrl = new URL(databaseUrl);
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

export const db = new DataSource({
    type: "cockroachdb",
    url: dbUrl.toString(),
    ssl: true,
    extra: {
        options: routingId
    },
    entities: [Todo],
    timeTravelQueries: false,
});

export const todosRepository = db.getRepository(Todo);