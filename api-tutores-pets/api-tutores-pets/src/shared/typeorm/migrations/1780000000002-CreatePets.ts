import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePets1780000000002 implements MigrationInterface {
  name = "CreatePets1780000000002";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "especie" character varying NOT NULL, "raca" character varying NOT NULL, "idade" integer NOT NULL, "peso" numeric NOT NULL, "observacoes" text, "tutor_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_pets_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets" ADD CONSTRAINT "FK_pets_tutor_id" FOREIGN KEY ("tutor_id") REFERENCES "tutores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pets" DROP CONSTRAINT "FK_pets_tutor_id"`,
    );
    await queryRunner.query(`DROP TABLE "pets"`);
  }
}
