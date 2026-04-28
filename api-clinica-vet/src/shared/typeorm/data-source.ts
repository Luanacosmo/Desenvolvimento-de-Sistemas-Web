import Animal from "@modules/animals/typeorm/entities/Animal";
import path from "node:path"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433, //5433 pra quando tem postgres instalado
    username:"postgres",
    password:"docker",
    database: "api_vet",
    synchronize: false,
    logging:true,
    entities: [Animal],
    migrations:[path.join("src", "shared", "typeorm", "migrations", "*.ts")]
});