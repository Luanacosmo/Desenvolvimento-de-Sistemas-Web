import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTutores1780000000001 implements MigrationInterface {
  name = "CreateTutores1780000000001";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tutores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, "endereco" character varying NOT NULL, "data_nascimento" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_tutores_cpf" UNIQUE ("cpf"), CONSTRAINT "UQ_tutores_email" UNIQUE ("email"), CONSTRAINT "PK_tutores_id" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tutores"`);
  }
}
