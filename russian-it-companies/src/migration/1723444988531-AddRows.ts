import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRows1723444988531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE IF NOT EXISTS it_company (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL)');
        await queryRunner.query('INSERT INTO it_company (id, name) VALUES (1, \'Тинькофф\'), (2, \'Lamoda\'), (3, \'Авито\'), (4, \'Додо Пицца\'), (5, \'Билайн\'), (6, \'Skyeng\')');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM it_company');
    }

}
