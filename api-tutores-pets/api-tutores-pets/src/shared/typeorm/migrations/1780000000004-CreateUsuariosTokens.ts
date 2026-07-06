import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsuariosTokens1780000000004 implements MigrationInterface {
  name = "CreateUsuariosTokens1780000000004";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuarios_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_usuarios_tokens_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuarios_tokens" ADD CONSTRAINT "FK_usuarios_tokens_usuario_id" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuarios_tokens" DROP CONSTRAINT "FK_usuarios_tokens_usuario_id"`,
    );
    await queryRunner.query(`DROP TABLE "usuarios_tokens"`);
  }
}
