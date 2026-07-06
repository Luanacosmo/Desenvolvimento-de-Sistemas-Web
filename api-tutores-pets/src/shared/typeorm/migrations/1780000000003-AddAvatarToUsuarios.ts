import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarToUsuarios1780000000003 implements MigrationInterface {
  name = "AddAvatarToUsuarios1780000000003";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuarios" ADD "avatar" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "avatar"`);
  }
}
