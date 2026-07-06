import "reflect-metadata";
import "dotenv/config";
import path from "node:path";
import { DataSource } from "typeorm";
import Tutor from "@modules/tutores/typeorm/entities/Tutor";
import Pet from "@modules/pets/typeorm/entities/Pet";
import Usuario from "@modules/usuarios/typeorm/entities/Usuario";
import UsuarioTokens from "@modules/usuarios/typeorm/entities/UsuarioTokens";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "docker",
  database: process.env.DB_DATABASE || "api-tutores-pets",
  synchronize: true,
  logging: true,
  entities: [Tutor, Pet, Usuario, UsuarioTokens],
  migrations: [path.join(__dirname, "migrations", "*.ts")],
  subscribers: [],
});
