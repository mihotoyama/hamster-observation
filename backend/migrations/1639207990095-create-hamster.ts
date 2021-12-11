import {MigrationInterface, QueryRunner} from "typeorm";

export class createHamster1639207990095 implements MigrationInterface {
    name = 'createHamster1639207990095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hamster" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nowtime" varchar NOT NULL, "weight" integer NOT NULL, "activeCount" integer NOT NULL, "temperature" integer NOT NULL, "wheelCount" integer NOT NULL, "houseCount" integer NOT NULL, "humidity" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hamster"`);
    }

}
