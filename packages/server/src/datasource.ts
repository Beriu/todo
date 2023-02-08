import { Todo } from "./models/Todo";
import { DataSource } from "typeorm";
import { URL } from "url";

const databaseUrl = 'postgresql://app:0rd_G9Hu3qr2tM64sCh4og@redkorp-main-2757.7tc.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full';

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