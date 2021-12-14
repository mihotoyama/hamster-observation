import {MigrationInterface, QueryRunner} from "typeorm";

export class addWheelSpeedToHamster1639485062740 implements MigrationInterface {
    name = 'addWheelSpeedToHamster1639485062740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_hamster" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nowtime" varchar NOT NULL, "weight" integer NOT NULL, "activeCount" integer NOT NULL, "temperature" integer NOT NULL, "wheelCount" integer NOT NULL, "houseCount" integer NOT NULL, "humidity" integer NOT NULL, "createdAt" datetime(0) NOT NULL DEFAULT (datetime('now', 'localtime')), "wheelSpeed" double)`);
        await queryRunner.query(`INSERT INTO "temporary_hamster"("id", "nowtime", "weight", "activeCount", "temperature", "wheelCount", "houseCount", "humidity", "createdAt") SELECT "id", "nowtime", "weight", "activeCount", "temperature", "wheelCount", "houseCount", "humidity", "createdAt" FROM "hamster"`);
        await queryRunner.query(`DROP TABLE "hamster"`);
        await queryRunner.query(`ALTER TABLE "temporary_hamster" RENAME TO "hamster"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hamster" RENAME TO "temporary_hamster"`);
        await queryRunner.query(`CREATE TABLE "hamster" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nowtime" varchar NOT NULL, "weight" integer NOT NULL, "activeCount" integer NOT NULL, "temperature" integer NOT NULL, "wheelCount" integer NOT NULL, "houseCount" integer NOT NULL, "humidity" integer NOT NULL, "createdAt" datetime(0) NOT NULL DEFAULT (datetime('now', 'localtime')))`);
        await queryRunner.query(`INSERT INTO "hamster"("id", "nowtime", "weight", "activeCount", "temperature", "wheelCount", "houseCount", "humidity", "createdAt") SELECT "id", "nowtime", "weight", "activeCount", "temperature", "wheelCount", "houseCount", "humidity", "createdAt" FROM "temporary_hamster"`);
        await queryRunner.query(`DROP TABLE "temporary_hamster"`);
    }

}
