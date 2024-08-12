import "reflect-metadata"
import { DataSource } from "typeorm"
import { ItCompany } from "./entities/it-company.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "russian-it-companies_db",
    synchronize: true,
    logging: false,
    entities: [ItCompany],
    migrations: ['dist/migration/*.{js,ts}']
})
