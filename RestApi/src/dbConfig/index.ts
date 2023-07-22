import { DataSource } from "typeorm"

const db = new DataSource({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Jv410551',
    database: "fithub",
    entities: ["src/models/entities/*.ts"],
    logging: true,
    synchronize: true,
});

export default db;