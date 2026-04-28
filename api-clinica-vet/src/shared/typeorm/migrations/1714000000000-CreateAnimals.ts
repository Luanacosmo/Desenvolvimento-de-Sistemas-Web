import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAnimals1714000000000 implements MigrationInterface {
    name = 'CreateAnimals1714000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "animals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "especie" character varying NOT NULL, "raca" character varying NOT NULL, "idade" integer NOT NULL, "peso" numeric NOT NULL, "nome_dono" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_animals" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "animals"`);
    }

}